import { BountyMetadata } from '@joystream/metadata-protobuf'
import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useBountyForumCategory } from '@/bounty/hooks/useBountyForumCategory'
import { FundingDetailsStep } from '@/bounty/modals/AddBountyModal/components/FundingDetailsStep'
import { GeneralParametersStep } from '@/bounty/modals/AddBountyModal/components/GeneralParametersStep'
import { JudgingDetailsStep } from '@/bounty/modals/AddBountyModal/components/JudgingDetailsStep'
import { SuccessModal } from '@/bounty/modals/AddBountyModal/components/SuccessModal'
import { WorkingDetailsStep } from '@/bounty/modals/AddBountyModal/components/WorkingDetailsStep'
import {
  Conditions,
  createBountyMetadataFactory,
  createBountyParametersFactory,
  isNextStepValid,
} from '@/bounty/modals/AddBountyModal/helpers'
import { addBountyMachine, AddBountyModalMachineState, AddBountyStates } from '@/bounty/modals/AddBountyModal/machine'
import { AuthorizeTransactionModal } from '@/bounty/modals/AuthorizeTransactionModal'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { getErrorMessage } from '@/common/components/forms/FieldError'
import { Arrow } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { Stepper, StepperBody, StepperModalBody, StepperModalWrapper } from '@/common/components/StepperModal'
import { TokenValue } from '@/common/components/typography'
import { WaitModal } from '@/common/components/WaitModal'
import { BN_ZERO } from '@/common/constants'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useSchema } from '@/common/hooks/useSchema'
import { isLastStepActive } from '@/common/modals/utils'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { getSteps } from '@/common/model/machines/getSteps'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
import Yup, { MemberSchema } from '@/memberships/model/validation'
import { Member } from '@/memberships/types'

const transactionSteps = [{ title: 'Create Thread' }, { title: 'Create Bounty' }]

const baseSchema = Yup.object().shape({
  [AddBountyStates.generalParameters]: Yup.object().shape({
    title: Yup.string().max(70, 'Max length is 70 characters').required(),
    coverPhotoLink: Yup.string().url('Invalid URL').required(),
    creator: MemberSchema.required(),
    description: Yup.string().required(),
  }),
  [AddBountyStates.fundingPeriodDetails]: Yup.object().shape({
    cherry: Yup.number()
      // @ts-expect-error: custom yup validator method
      .minContext('Cherry must be greater than minimum of ${min} JOY', 'minCherryLimit')
      .maxContext('Cherry of ${max} JOY exceeds your balance', 'maxCherryLimit')
      .required(),
    fundingMaximalRange: Yup.number().required(),
    fundingMinimalRange: Yup.number()
      .lessThan(Yup.ref('fundingMaximalRange'), 'Minimal range cannot be greater than maximal')
      // @ts-expect-error: custom yup validator method
      .minContext('Minimal range must be bigger than ${min}', 'minFundingLimit'),
  }),
  [AddBountyStates.workingPeriodDetails]: Yup.object().shape({
    // @ts-expect-error: custom yup validator method
    workingPeriodStake: Yup.number().minContext(
      'Entrant stake must be greater than minimum of ${min} JOY',
      'minWorkEntrantStake'
    ),
    workingPeriodType: Yup.string(),
    workingPeriodWhitelist: Yup.array().test((value, context) => {
      if (!value) {
        return true
      }

      const validationContext = context.options.context as Conditions
      if (context.parent.workingPeriodType === 'closed') {
        return value.length > 0 && validationContext.maxWhitelistSize.gten(value.length)
      }

      return true
    }),
  }),
  [AddBountyStates.judgingPeriodDetails]: Yup.object().shape({}),
})

export const AddBountyModal = () => {
  const { t } = useTranslation()
  const { threadCategory, isLoading: isThreadCategoryLoading } = useBountyForumCategory()
  const { hideModal, showModal } = useModal()
  const { active: activeMember } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const [state, send, service] = useMachine(addBountyMachine)
  const [isValidNext, setValidNext] = useState(false)

  const { api } = useApi()
  const balance = useBalance(activeMember?.controllerAccount)
  const bountyApi = api?.consts.bounty

  const { errors, setContext } = useSchema<Conditions>(
    {
      generalParameters: { ...state.context },
      [AddBountyStates.fundingPeriodDetails]: { ...state.context },
      [AddBountyStates.workingPeriodDetails]: { ...state.context },
    },
    baseSchema,
    typeof state.value === 'string' ? state.value : undefined
  )
  console.log(errors, ' erry', state.context.workingPeriodWhitelist)
  if (!service.initialized) {
    service.start()
  }

  useEffect(() => {
    setContext({
      isThreadCategoryLoading,
      minCherryLimit: bountyApi?.minCherryLimit,
      maxCherryLimit: balance?.transferable,
      minFundingLimit: bountyApi?.minFundingLimit,
      maxWhitelistSize: bountyApi?.closedContractSizeLimit,
      minWorkEntrantStake: bountyApi?.minWorkEntrantStake,
      isLimited: state.context.fundingPeriodType === 'limited',
    })
  }, [bountyApi, JSON.stringify(balance?.transferable), state.context.fundingPeriodType])

  useEffect(() => {
    if (state.matches(AddBountyStates.requirementsVerification)) {
      if (!activeMember) {
        return showModal<SwitchMemberModalCall>({
          modal: 'SwitchMember',
          data: {
            originalModalName: 'AddBounty',
          },
        })
      }
      if (activeMember && api) {
        send('NEXT')
      }
    }

    setValidNext(
      isNextStepValid(state as AddBountyModalMachineState, {
        isThreadCategoryLoading,
        minCherryLimit: bountyApi?.minCherryLimit,
        maxCherryLimit: balance?.transferable,
        minFundingLimit: bountyApi?.minFundingLimit,
        maxWhitelistSize: bountyApi?.closedContractSizeLimit,
        minWorkEntrantStake: bountyApi?.minWorkEntrantStake,
        isLimited: state.context.fundingPeriodType === 'limited',
      })
    )
  }, [state, isThreadCategoryLoading, api])

  useEffect(() => {
    if (state.matches(AddBountyStates.generalParameters)) {
      if (activeMember && !state.context.creator) {
        send('SET_CREATOR', { creator: activeMember })
      }
    }
    if (state.matches(AddBountyStates.judgingPeriodDetails)) {
      if (threadCategory && !state.context.threadCategoryId) {
        send('SET_THREAD_CATEGORY_ID', { threadCategoryId: threadCategory.id })
      }
    }
  }, [activeMember, state, threadCategory?.id])

  if (state.matches(AddBountyStates.requirementsVerification)) {
    return (
      <WaitModal
        title={t('common:modals.wait.title')}
        description={t('common:modals.wait.description')}
        onClose={hideModal}
        requirements={[
          { name: 'Initializing server connection', state: !!api },
          { name: 'Loading member', state: !!activeMember },
        ]}
      />
    )
  }

  if (!activeMember || !api) {
    return null
  }

  if (state.matches(AddBountyStates.createThread) && threadCategory) {
    const { title, creator, threadCategoryId } = state.context
    const transaction = api.tx.forum.createThread(
      activeMember.id,
      threadCategoryId,
      `${title} by ${creator?.handle}`,
      `This is the description thread for ${title}`,
      null
    )
    const service = state.children.createThread
    const controllerAccount = accountOrNamed(allAccounts, activeMember.controllerAccount, 'Controller Account')

    return (
      <AuthorizeTransactionModal
        onClose={hideModal}
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
        description="You intend to create forum thread for your bounty."
        buttonLabel="Create Forum Thread"
        useMultiTransaction={{ steps: transactionSteps, active: 0 }}
        skipQueryNodeCheck
      />
    )
  }

  if (state.matches(AddBountyStates.transaction)) {
    const service = state.children.transaction
    const transaction = api.tx.bounty.createBounty(
      createBountyParametersFactory(state as AddBountyModalMachineState),
      metadataToBytes(BountyMetadata, createBountyMetadataFactory(state as AddBountyModalMachineState))
    )
    const controllerAccount = accountOrNamed(allAccounts, activeMember.controllerAccount, 'Controller Account')

    return (
      <AuthorizeTransactionModal
        onClose={hideModal}
        transaction={transaction}
        service={service}
        buttonLabel="Sign transaction and Create"
        description={
          <>
            You intend to create a bounty. You will be charged <TokenValue value={state.context.cherry} /> for cherry.
          </>
        }
        controllerAccount={controllerAccount}
        useMultiTransaction={{ steps: transactionSteps, active: 1 }}
      />
    )
  }

  if (state.matches(AddBountyStates.success)) {
    return <SuccessModal onClose={hideModal} bountyId={state.context.bountyId} />
  }

  if (state.matches(AddBountyStates.error)) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        There was a problem while creating bounty.
      </FailureModal>
    )
  }

  if (state.matches(AddBountyStates.canceled)) {
    return <FailureModal onClose={hideModal}>Transaction has been canceled.</FailureModal>
  }

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader title="Creating New Bounty" onClick={hideModal} />
      <StepperModalBody>
        <AddBountyModalWrapper>
          <Stepper steps={getSteps(service)} />
          <StepperBody>
            {state.matches(AddBountyStates.generalParameters) && (
              <GeneralParametersStep
                title={state.context.title}
                setTitle={(title: string) => send('SET_BOUNTY_TITLE', { title })}
                description={state.context.description}
                setDescription={(description: string) => send('SET_BOUNTY_DESCRIPTION', { description })}
                coverPhotoLink={state.context.coverPhotoLink}
                setCoverPhoto={(coverPhotoLink: string) => send('SET_COVER_PHOTO', { coverPhotoLink })}
                activeMember={activeMember}
              />
            )}

            {state.matches(AddBountyStates.fundingPeriodDetails) && (
              <FundingDetailsStep
                cherry={state.context.cherry}
                setCherry={(cherry) => send('SET_CHERRY', { cherry })}
                maxCherryLimit={balance?.transferable.toNumber() || 0}
                minCherryLimit={bountyApi?.minCherryLimit.toNumber() || 0}
                fundingMaximalRange={state.context.fundingMaximalRange}
                setFundingMaximalRange={(fundingMaximalRange) =>
                  send('SET_FUNDING_MAXIMAL_RANGE', { fundingMaximalRange })
                }
                fundingMinimalRange={state.context.fundingMinimalRange}
                setFundingMinimalRange={(fundingMinimalRange) =>
                  send('SET_FUNDING_MINIMAL_RANGE', { fundingMinimalRange })
                }
                fundingPeriodType={state.context.fundingPeriodType}
                setFundingPeriodType={(fundingPeriodType) => send('SET_FUNDING_PERIOD_TYPE', { fundingPeriodType })}
                account={activeMember?.controllerAccount}
                fundingPeriodLength={state.context.fundingPeriodLength}
                setFundingPeriodLength={(fundingPeriodLength) =>
                  send('SET_FUNDING_PERIOD_LENGTH', { fundingPeriodLength })
                }
              />
            )}
            {state.matches(AddBountyStates.workingPeriodDetails) && (
              <WorkingDetailsStep
                minEntrantStake={bountyApi?.minWorkEntrantStake}
                workingPeriodType={state.context.workingPeriodType}
                workingPeriodLength={state.context.workingPeriodLength}
                workingPeriodStake={state.context.workingPeriodStake}
                workingPeriodWhitelist={state.context.workingPeriodWhitelist}
                setWorkingPeriodWhitelist={(members: Member[]) =>
                  send('SET_WORKING_PERIOD_WHITELIST', { workingPeriodWhitelist: members })
                }
                setWorkingPeriodLength={(workingPeriodLength) =>
                  send('SET_WORKING_PERIOD_LENGTH', { workingPeriodLength })
                }
                setWorkingPeriodStake={(workingPeriodStake) => send('SET_WORKING_PERIOD_STAKE', { workingPeriodStake })}
                setWorkingPeriodType={(workingPeriodType) => send('SET_WORKING_PERIOD_TYPE', { workingPeriodType })}
                whitelistLimit={bountyApi?.closedContractSizeLimit}
              />
            )}
            {state.matches(AddBountyStates.judgingPeriodDetails) && (
              <JudgingDetailsStep
                oracle={state.context.oracle}
                judgingPeriodLength={state.context.judgingPeriodLength}
                setJudgingPeriodLength={(judgingPeriodLength) =>
                  send('SET_JUDGING_PERIOD_LENGTH', { judgingPeriodLength })
                }
                setOracle={(oracle) => send('SET_ORACLE', { oracle })}
              />
            )}
          </StepperBody>
        </AddBountyModalWrapper>
      </StepperModalBody>
      <ModalFooter>
        <ButtonsGroup align="left">
          {!state.matches(AddBountyStates.generalParameters) && (
            <ButtonGhost onClick={() => send('BACK')} size="medium">
              <Arrow direction="left" />
              Previous step
            </ButtonGhost>
          )}
        </ButtonsGroup>
        <ButtonsGroup align="right">
          <ButtonPrimary disabled={!isValidNext} onClick={() => send('NEXT')} size="medium">
            {isLastStepActive(getSteps(service)) ? 'Create bounty' : 'Next step'}
          </ButtonPrimary>
        </ButtonsGroup>
      </ModalFooter>
    </Modal>
  )
}

const AddBountyModalWrapper = styled(StepperModalWrapper)`
  grid-template-columns: 184px 1fr;
`
