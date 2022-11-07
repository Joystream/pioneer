import React, { useMemo, useState } from 'react'

import * as Yup from 'yup'
import { FormProvider, useForm } from 'react-hook-form'
import { enhancedGetErrorMessage, enhancedHasError, useYupValidationResolver } from '@/common/utils/validation'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { InputComponent, InputText, InputTextarea } from '@/common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { useModal } from '@/common/hooks/useModal'
import { CreateOpeningModalCall } from '@/working-groups/modals/CreateOpening/types'
import {
  ApplicationForm,
  WorkingGroupAndDescription,
} from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/CreateWorkingGroupLeadOpening'

export const CreateOpeningSchema = Yup.object().shape({
  topic: Yup.string().required('This field is required'),
  description: Yup.string().required('This field is required'),
})

export interface CreateOpeningFields {
  target: number
}
const defaultValues = {
  target: 1,
}

export const CreateOpeningModal = () => {
  const {
    hideModal,
    modalData: { group },
  } = useModal<CreateOpeningModalCall>()

  const form = useForm<CreateOpeningFields>({
    resolver: useYupValidationResolver(CreateOpeningSchema),
    mode: 'onChange',
    defaultValues,
  })

  // TODO mock
  const isValid = useMemo(() => false, [])
  const onSubmit = () => console.log('submitting')
  const importJSON = () => console.log('importing')
  const exportJSON = () => console.log('exporting')
  console.log('form', form)

  if (!group) return null
  return (
    <Modal onClose={hideModal} modalSize="m" modalHeight="s">
      <ModalHeader title="Create Opening" onClick={hideModal} />
      <ModalBody>
        <FormProvider {...form}>
          <WorkingGroupAndDescription noHeader groupId={group} />

          <InputComponent id="target" label="Hiring target" inputSize="s" name="target">
            <InputText id="hiring-target" name="target" />
          </InputComponent>

          <ApplicationForm noHeader />
        </FormProvider>
      </ModalBody>
      <ModalFooter>
        <ButtonsGroup align="left">
          <ButtonPrimary size="medium" onClick={importJSON}>
            Import
          </ButtonPrimary>
          <ButtonPrimary disabled={!isValid} size="medium" onClick={exportJSON}>
            Export
          </ButtonPrimary>
        </ButtonsGroup>
        <ButtonsGroup align="right">
          <ButtonPrimary disabled={!isValid} size="medium" onClick={onSubmit}>
            Create Opening
          </ButtonPrimary>
        </ButtonsGroup>
      </ModalFooter>
    </Modal>
  )
}
