import { BountyMetadata, ForumThreadMetadata } from '@joystream/metadata-protobuf'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/api/hooks/useApi'
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
import { Modal, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import { Stepper, StepperBody, StepperModalBody, StepperModalWrapper } from '@/common/components/StepperModal'
import { TokenValue } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { isLastStepActive } from '@/common/modals/utils'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { getSteps } from '@/common/model/machines/getSteps'
import { asBN } from '@/common/utils/bn'
import { enhancedGetErrorMessage, enhancedHasError, useYupValidationResolver } from '@/common/utils/validation'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

const transactionSteps = [{ title: 'Create Thread' }, { title: 'Create Bounty' }]

export const AddBountyModal = () => {
  const { threadCategory, isLoading: isThreadCategoryLoading } = useBountyForumCategory()
  const { hideModal } = useModal()
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
      metadataToBytes(ForumThreadMetadata, {
        tags: [''],
        title: `${title} by ${creator?.handle}`,
      }),
      `This is the description thread for ${title}`
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
                  minCherryLimit={asBN(bountyApi?.minCherryLimit ?? 0)}
                  errorChecker={enhancedHasError(form.formState.errors, state.value as string)}
                  errorMessageGetter={enhancedGetErrorMessage(form.formState.errors, state.value as string)}
                />
              )}
              {state.matches(AddBountyStates.workingPeriodDetails) && (
                <WorkingDetailsStep
                  minEntrantStake={asBN(bountyApi?.minWorkEntrantStake ?? 0)}
                  whitelistLimit={bountyApi?.closedContractSizeLimit && Number(bountyApi?.closedContractSizeLimit)}
                  errorChecker={enhancedHasError(form.formState.errors, state.value as string)}
                  errorMessageGetter={enhancedGetErrorMessage(form.formState.errors, state.value as string)}
                />
              )}
              {state.matches(AddBountyStates.judgingPeriodDetails) && <JudgingDetailsStep />}
            </FormProvider>
          </StepperBody>
        </AddBountyModalWrapper>
      </StepperModalBody>
      <ModalTransactionFooter
        prev={{ disabled: state.matches(AddBountyStates.generalParameters), onClick: () => send('BACK') }}
        next={{
          disabled: !form.formState.isValid,
          label: isLastStepActive(getSteps(service)) ? 'Create bounty' : 'Next step',
          onClick: () => send('NEXT'),
        }}
      />
    </Modal>
  )
}

const AddBountyModalWrapper = styled(StepperModalWrapper)`
  grid-template-columns: 184px 1fr;
`
