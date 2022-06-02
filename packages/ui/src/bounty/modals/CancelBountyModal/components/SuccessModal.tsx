import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router'
import { useHistory } from 'react-router-dom'

import { BountyRoutes } from '@/bounty/constants'
import { ButtonGhost } from '@/common/components/buttons'
import { SuccessSymbol } from '@/common/components/icons/symbols'
import { Info } from '@/common/components/Info'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'

interface Props {
  onClose: () => void
}

export const SuccessModal = ({ onClose }: Props) => {
  const { t } = useTranslation('bounty')
  const history = useHistory()

  const goToCurrentBounties = useCallback(() => {
    history.push(generatePath(BountyRoutes.currentBounties))
    onClose()
  }, [onClose])

  return (
    <Modal modalSize="s" modalHeight="s" onClose={onClose}>
      <ModalHeader title={t('common:success')} onClick={onClose} icon={<SuccessSymbol />} />
      <ModalBody>
        <Info>
          <TextMedium>{t('modals.bountyCancel.success.message')}</TextMedium>
        </Info>
      </ModalBody>
      <ModalFooter>
        <ButtonGhost onClick={goToCurrentBounties} size="medium">
          {t('modals.bountyCancel.success.button')}
        </ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
