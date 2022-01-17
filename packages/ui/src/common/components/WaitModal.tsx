import React from 'react'
import { useTranslation } from 'react-i18next'

import { Loader } from './icons'
import { WaitingIcon } from './icons/WaitingIcon'
import { Modal, ModalHeader, ModalTitle, ResultModalBody, ResultTextWhite } from './Modal'

export interface WaitModalProps {
  onClose: () => void
  title?: string
  description?: string
  requirementsCheck?: boolean
}

export const WaitModal = ({
  onClose,
  title: baseTitle,
  description: baseDescription,
  requirementsCheck,
}: WaitModalProps) => {
  const { t } = useTranslation()
  const title = requirementsCheck ? t('modals.wait.title') : baseTitle
  const description = requirementsCheck ? t('modals.wait.description') : baseDescription
  return (
    <Modal modalSize="xs" modalHeight="s" isDark onClose={onClose}>
      <ModalHeader icon={<Loader />} title="" onClick={onClose} modalHeaderSize="s" />
      <ResultModalBody>
        <WaitingIcon />
        <ModalTitle as="h4">{title}</ModalTitle>
        <ResultTextWhite>{description}</ResultTextWhite>
      </ResultModalBody>
    </Modal>
  )
}
