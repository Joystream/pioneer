import React, { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { DownloadButtonGhost } from '@/common/components/buttons/DownloadButtons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { useModal } from '@/common/hooks/useModal'
import { useYupValidationResolver } from '@/common/utils/validation'
import { CreateOpeningModalCall } from '@/working-groups/modals/CreateOpening/types'

import { CreateOpeningForm } from './CreateOpeningForm'
import { ImportOpening } from './ImportOpening'

export interface Opening {
  target: number
  title: string
  description: string
}

export const OpeningSchema = Yup.object().shape({
  topic: Yup.string().required('topic is required.'),
  description: Yup.string().required('description is required.'),
  target: Yup.number().optional(),
})

const defaultValues = {
  target: 1,
  title: 'Topic',
  description: 'Text here',
}

export const CreateOpeningModal = () => {
  const [opening, setOpening] = useState<Opening>()
  const [showFileInput, setShowFileInput] = useState<boolean>()
  const exportJSON = useMemo(() => JSON.stringify(opening), [opening])

  const {
    hideModal,
    modalData: { group },
  } = useModal<CreateOpeningModalCall>()

  const form = useForm({
    resolver: useYupValidationResolver<Opening>(OpeningSchema),
    mode: 'onChange',
    context: opening,
    defaultValues,
  })

  const onSubmit = () => {
    // heavy lifting here
  }

  if (!group) return null
  return (
    <Modal onClose={hideModal} modalSize="m" modalHeight="s">
      <ModalHeader title="Create Opening" onClick={hideModal} />
      <ModalBody>
        {showFileInput ? (
          <ImportOpening handleChange={(o: Opening) => setOpening(o)} onHide={() => setShowFileInput(false)} />
        ) : (
          <FormProvider {...form}>
            <CreateOpeningForm group={group} />
          </FormProvider>
        )}
      </ModalBody>
      <ModalFooter>
        <ButtonsGroup align="left">
          <ButtonPrimary size="medium" onClick={() => setShowFileInput(!showFileInput)}>
            Import
          </ButtonPrimary>
          <DownloadButtonGhost size="medium" name={'opening.json'} parts={[exportJSON]}>
            Export
          </DownloadButtonGhost>
        </ButtonsGroup>
        <ButtonsGroup align="right">
          <ButtonPrimary disabled={!form.formState.isValid} size="medium" onClick={onSubmit}>
            Create Opening
          </ButtonPrimary>
        </ButtonsGroup>
      </ModalFooter>
    </Modal>
  )
}
