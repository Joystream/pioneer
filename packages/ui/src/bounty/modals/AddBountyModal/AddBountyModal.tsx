import { BountyMetadata } from '@joystream/metadata-protobuf'
import { useMachine } from '@xstate/react'
import React, { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
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
  AddBountyFrom,
  addBountyModalSchema,
  Conditions,
  createBountyMetadataFactory,
  createBountyParametersFactory,
  formDefaultValues,
} from '@/bounty/modals/AddBountyModal/helpers'
import { addBountyMachine, AddBountyStates } from '@/bounty/modals/AddBountyModal/machine'
import { AuthorizeTransactionModal } from '@/bounty/modals/AuthorizeTransactionModal'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { Arrow } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { Stepper, StepperBody, StepperModalBody, StepperModalWrapper } from '@/common/components/StepperModal'
import { TokenValue } from '@/common/components/typography'
import { WaitModal } from '@/common/components/WaitModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { isLastStepActive } from '@/common/modals/utils'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { getSteps } from '@/common/model/machines/getSteps'
import { enhancedGetErrorMessage, enhancedHasError, useYupValidationResolver } from '@/common/utils/validation'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

const transactionSteps = [{ title: 'Create Thread' }, { title: 'Create Bounty' }]

export const AddBountyModal = () => {
  const { t } = useTranslation()
  const { threadCategory, isLoading: isThreadCategoryLoading } = useBountyForumCategory()
  const { hideModal, showModal } = useModal()
  const { active: activeMember } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const [state, send, service] = useMachine(addBountyMachine)

  const { api } = useApi()
  const balance = useBalance(activeMember?.controllerAccount)
  const bountyApi = api?.consts.bounty
  const form = useForm({
    resolver: useYupValidationResolver<AddBountyFrom>(
      addBountyModalSchema,
      typeof state.value === 'string' ? state.value : undefined
    ),
    context: {
      isThreadCategoryLoading,
      minCherryLimit: bountyApi?.minCherryLimit,
      maxCherryLimit: balance?.transferable,
      minFundingLimit: bountyApi?.minFundingLimit,
      maxWhitelistSize: bountyApi?.closedContractSizeLimit,
      minWorkEntrantStake: bountyApi?.minWorkEntrantStake,
    } as Conditions,
    mode: 'onChange',
    defaultValues: formDefaultValues,
  })

  if (!service.initialized) {
    service.start()
  }

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
  }, [state, isThreadCategoryLoading, api])

  useEffect(() => {
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
    const {
      [AddBountyStates.generalParameters]: { title, creator },
    } = form.getValues() as AddBountyFrom
    const transaction = api.tx.forum.createThread(
      activeMember.id,
      threadCategory.id,
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
    const fromFields = form.getValues() as AddBountyFrom
    const service = state.children.transaction
    const transaction = api.tx.bounty.createBounty(
      createBountyParametersFactory(fromFields),
      metadataToBytes(BountyMetadata, createBountyMetadataFactory(fromFields, state.context.newThreadId))
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
            You intend to create a bounty. You will be charged{' '}
            <TokenValue value={fromFields[AddBountyStates.fundingPeriodDetails].cherry} /> for cherry.
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
            <FormProvider {...form}>
              {state.matches(AddBountyStates.generalParameters) && (
                <GeneralParametersStep
                  activeMember={activeMember}
                  errorChecker={enhancedHasError(form.formState.errors, state.value as string)}
                  errorMessageGetter={enhancedGetErrorMessage(form.formState.errors, state.value as string)}
                />
              )}

              {state.matches(AddBountyStates.fundingPeriodDetails) && (
                <FundingDetailsStep
                  minCherryLimit={bountyApi?.minCherryLimit.toNumber() || 0}
                  errorChecker={enhancedHasError(form.formState.errors, state.value as string)}
                  errorMessageGetter={enhancedGetErrorMessage(form.formState.errors, state.value as string)}
                />
              )}
              {state.matches(AddBountyStates.workingPeriodDetails) && (
                <WorkingDetailsStep
                  minEntrantStake={bountyApi?.minWorkEntrantStake}
                  whitelistLimit={bountyApi?.closedContractSizeLimit}
                  errorChecker={enhancedHasError(form.formState.errors, state.value as string)}
                  errorMessageGetter={enhancedGetErrorMessage(form.formState.errors, state.value as string)}
                />
              )}
              {state.matches(AddBountyStates.judgingPeriodDetails) && <JudgingDetailsStep />}
            </FormProvider>
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
          <ButtonPrimary disabled={!form.formState.isValid} onClick={() => send('NEXT')} size="medium">
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
