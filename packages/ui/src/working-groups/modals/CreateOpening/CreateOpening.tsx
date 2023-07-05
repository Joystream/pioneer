import BN from 'bn.js'
import React, { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { DownloadButtonGhost } from '@/common/components/buttons/DownloadButtons'
import { Modal, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import {
  /*StepDescriptionColumn, */ Stepper,
  StepperModalBody,
  StepperModalWrapper,
} from '@/common/components/StepperModal'
import { TextMedium } from '@/common/components/typography'
import { JOY_DECIMAL_PLACES } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { isLastStepActive } from '@/common/modals/utils'
import { getSteps } from '@/common/model/machines/getSteps'
import { useYupValidationResolver } from '@/common/utils/validation'
import { machineStateConverter } from '@/council/modals/AnnounceCandidacy/helpers'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { StyledStepperBody } from '@/proposals/modals/AddNewProposal'
import { GroupIdToGroupParam } from '@/working-groups/constants'

import { SuccessModal, CreateOpeningSteps as Steps, ImportOpening } from './components'
import { createOpeningMachine, CreateOpeningMachineState, getTxParams } from './machine'
import { OpeningConditions, CreateOpeningForm, CreateOpeningModalCall, OpeningSchema, defaultValues } from './types'

const transactionSteps = [{ title: 'Import Opening' }, { title: 'Edit Opening' }, { title: 'Submit Opening' }]

export const CreateOpeningModal = () => {
  const [showImport, setShowImport] = useState<boolean>(false)

  const { api, connectionState } = useApi()
  const { active: activeMember } = useMyMemberships()
  const [state, send, service] = useMachine(createOpeningMachine)
  const { hideModal, modalData } = useModal<CreateOpeningModalCall>()

  const { group } = modalData
  const context = { hiringTarget: 1, minStake: new BN(50000), group } as OpeningConditions
  const path = useMemo(() => machineStateConverter(state.value), [state.value])
  const resolver = useYupValidationResolver<CreateOpeningForm>(OpeningSchema, path)
  const form = useForm<CreateOpeningForm>({ resolver, mode: 'onChange', defaultValues, context })
  /**
  const [stakingPolicyAndRewardRewardPerBlock] = form.watch([
    'applicationForm.questions',
    'workingGroupAndDescription.title',
    'workingGroupAndDescription.shortDescription',
    'workingGroupAndDescription.description',
    'durationAndProcess.details',
    'durationAndProcess.duration',
    'stakingPolicyAndReward.stakingAmount',
    'stakingPolicyAndReward.leavingUnstakingPeriod',
    'stakingPolicyAndReward.rewardPerBlock',
  ])
  **/
  useEffect(() => {
    form.trigger(machineStateConverter(state.value) as keyof CreateOpeningForm)
  }, [machineStateConverter(state.value)])

  const createOpeningTx = useMemo(() => {
    if (api && group) {
      const { ...specifics } = form.getValues() as CreateOpeningForm
      const { description, stakePolicy, rewardPerBlock } = getTxParams(group, specifics)
      return api.tx[group].addOpening(description, 'Regular', stakePolicy, String(rewardPerBlock))
    }
  }, [connectionState, activeMember?.id, form.formState.isValidating, group])

  const { feeInfo } = useTransactionFee(activeMember?.controllerAccount, () => createOpeningTx, [
    connectionState,
    createOpeningTx,
  ])
  const setExportJsonValue = () => {
    const { ...specifics } = form.getValues() as CreateOpeningForm
    const exportValue = {
      applicationDetails: specifics.durationAndProcess.details,
      title: specifics.workingGroupAndDescription.title,
      shortDescription: specifics.workingGroupAndDescription.shortDescription,
      description: specifics.workingGroupAndDescription.description,
      applicationFormQuestions: specifics.applicationForm?.questions?.map((question) => {
        return { question: question.questionField }
      }),
      stakingPolicy: {
        amount: specifics.stakingPolicyAndReward.stakingAmount / Math.pow(10, JOY_DECIMAL_PLACES),
        unstakingPeriod: specifics.stakingPolicyAndReward.leavingUnstakingPeriod,
      },
      rewardPerBlock: specifics.stakingPolicyAndReward.rewardPerBlock / Math.pow(10, JOY_DECIMAL_PLACES),
    }
    return exportValue
  }

  useEffect((): any => {
    if (state.matches('requirementsVerification')) {
      return feeInfo && send(feeInfo.canAfford ? 'NEXT' : 'FAIL')
    }
    if (state.matches('beforeTransaction')) {
      return feeInfo?.canAfford ? send('NEXT') : send('FAIL')
    }
  }, [state, activeMember?.id, feeInfo])

  if (!activeMember || state.matches('requirementsFailed')) {
    return null
  }

  if (state.matches('transaction') && createOpeningTx) {
    const tooltipText = `This adds an opening for ${GroupIdToGroupParam[group]}.`
    return (
      <SignTransactionModal
        additionalTransactionInfo={[{ title: 'Create Opening', tooltipText }]}
        buttonText="Sign transaction and Create"
        transaction={createOpeningTx}
        signer={activeMember.controllerAccount}
        service={state.children.transaction}
        useMultiTransaction={{ steps: transactionSteps, active: 1 }}
        skipQueryNode
      >
        <TextMedium>You intend to create an Opening.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('success')) {
    return <SuccessModal onClose={hideModal} memberId={activeMember.id} />
  }

  return (
    <Modal onClose={hideModal} modalSize="m" modalHeight="xl">
      <ModalHeader title="Create Opening" onClick={hideModal} />

      <StepperModalBody>
        <StepperOpeningWrapper>
          <Stepper steps={getSteps(service)} />
          {/* <StepDescriptionColumn></StepDescriptionColumn> */}
          <StyledStepperBody>
            <FormProvider {...form}>
              {showImport ? (
                <ImportOpening groupId={group} />
              ) : (
                <Steps matches={state.matches as CreateOpeningMachineState['matches']} groupId={group} />
              )}
            </FormProvider>
          </StyledStepperBody>
        </StepperOpeningWrapper>
      </StepperModalBody>

      <ModalTransactionFooter
        next={{
          disabled: !form.formState.isValid || showImport,
          label: isLastStepActive(getSteps(service)) ? 'Create Opening' : 'Next step',
          onClick: () => send('NEXT'),
        }}
        extraButtons={
          <ButtonsGroup align="left">
            <ButtonPrimary size="medium" onClick={() => setShowImport(!showImport)}>
              {showImport ? 'Preview Import' : 'Import'}
            </ButtonPrimary>
            <DownloadButtonGhost size="medium" name={'opening.json'} parts={[JSON.stringify(setExportJsonValue())]}>
              Export
            </DownloadButtonGhost>
          </ButtonsGroup>
        }
      />
    </Modal>
  )
}

export const StepperOpeningWrapper = styled(StepperModalWrapper)`
  // grid-template-columns: 220px 336px 1fr;
  grid-template-columns: 220px 1fr;
`
