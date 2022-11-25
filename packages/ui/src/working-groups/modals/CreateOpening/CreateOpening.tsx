import React, { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { DownloadButtonGhost } from '@/common/components/buttons/DownloadButtons'
import { Modal, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import { StepDescriptionColumn, Stepper, StepperModalBody } from '@/common/components/StepperModal'
import { TextMedium } from '@/common/components/typography'
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

import { SuccessModal, CreateOpeningSteps as Steps } from './components'
import { createOpeningMachine, CreateOpeningMachineState, getTxParams } from './machine'
import { CreateOpeningForm, CreateOpeningModalCall, OpeningSchema, defaultValues } from './types'

const transactionSteps = [{ title: 'Import Opening' }, { title: 'Edit Opening' }, { title: 'Submit Opening' }]

export const CreateOpeningModal = () => {
  const { api, connectionState } = useApi()
  const { active: activeMember } = useMyMemberships()
  const [state, send, service] = useMachine(createOpeningMachine)
  const { hideModal, modalData } = useModal<CreateOpeningModalCall>()
  const { group } = modalData

  const [showFileInput, setShowFileInput] = useState<boolean>()
  const resolver = useYupValidationResolver<CreateOpeningForm>(OpeningSchema, machineStateConverter(state.value))
  const form = useForm<CreateOpeningForm>({ resolver, mode: 'onChange', defaultValues })
  //const [] = form.watch([])

  useEffect(() => {
    form.trigger(machineStateConverter(state.value) as keyof CreateOpeningForm)
  }, [machineStateConverter(state.value)])

  const createOpeningTx = useMemo(() => {
    if (api) {
      const { ...specifics } = form.getValues() as CreateOpeningForm
      const params = getTxParams(group, specifics)
      //return api.tx[group].addOpening(description, openingType, stakingPolicyAndReward, '1')
      return api.tx.system.remark('wen mainnet') // TODO dummy
    }
  }, [connectionState, activeMember?.id])

  const { feeInfo } = useTransactionFee(activeMember?.controllerAccount, () => createOpeningTx, [
    connectionState,
    createOpeningTx,
  ])

  useEffect((): any => {
    if (state.matches('requirementsVerification')) {
      feeInfo && send(feeInfo.canAfford ? 'NEXT' : 'FAIL')
    }
    if (state.matches('beforeTransaction')) {
      return feeInfo?.canAfford ? null : send('FAIL')
    }
  }, [state, activeMember?.id, feeInfo?.canAfford])

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
        service={state.children.createOpeningTx}
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
    <Modal onClose={hideModal} modalSize="m" modalHeight="s">
      <ModalHeader title="Create Opening" onClick={hideModal} />

      <StepperModalBody>
        <Stepper steps={getSteps(service)} />
        <StepDescriptionColumn></StepDescriptionColumn>
        <StyledStepperBody>
          <FormProvider {...form}>
            <Steps matches={state.matches as CreateOpeningMachineState['matches']} />
          </FormProvider>
        </StyledStepperBody>
      </StepperModalBody>

      <ModalTransactionFooter
        next={{
          disabled: !form.formState.isValid,
          label: isLastStepActive(getSteps(service)) ? 'Create Opening' : 'Next step',
          onClick: () => send('NEXT'),
        }}
        extraButtons={
          <>
            <ButtonsGroup align="left">
              <ButtonPrimary size="medium" onClick={() => setShowFileInput(!showFileInput)}>
                Import
              </ButtonPrimary>
              <DownloadButtonGhost size="medium" name={'opening.json'} parts={[JSON.stringify(form.getValues())]}>
                Export
              </DownloadButtonGhost>
            </ButtonsGroup>
          </>
        }
      />
    </Modal>
  )
}
