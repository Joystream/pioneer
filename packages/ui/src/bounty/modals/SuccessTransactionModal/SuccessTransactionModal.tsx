import React from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonGhost } from '@/common/components/buttons'
import { SuccessSymbol } from '@/common/components/icons/symbols'
import { Info } from '@/common/components/Info'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'

interface Props {
  onClose: () => void,
  onButtonClick: () => void,
  buttonLabel: string;
  message: string;
}

export const SuccessModal = ({ onClose, onButtonClick, message, buttonLabel }: Props) => {
  const { t } = useTranslation('bounty')

  return (
    <Modal modalSize="s" modalHeight="s" onClose={onClose}>
      <ModalHeader title={t('common:success')} onClick={onClose} icon={<SuccessSymbol />} />
      <ModalBody>
        <Info>
          <TextMedium>{message}</TextMedium>
        </Info>
      </ModalBody>
      <ModalFooter>
        <ButtonGhost disabled onClick={onButtonClick} size="medium">
          {buttonLabel}
        </ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
