import React from 'react'
import { useHistory } from 'react-router'

import { ProfileRoutes } from '@/app/constants/routes'
import { ButtonGhost } from '@/common/components/buttons'
import { SuccessIcon } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader, SuccessModalBody } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'

interface Props {
  onClose: () => void
}

export const RecoverBalanceSuccessModal = ({ onClose }: Props) => {
  const history = useHistory()

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />
      <SuccessModalBody>
        <TextMedium margin="l">Your stake amount was recovered successfully.</TextMedium>
      </SuccessModalBody>
      <ModalFooter>
        <ButtonGhost
          size="medium"
          onClick={() => {
            history.push(ProfileRoutes.profile)
            onClose()
          }}
        >
          Your account
        </ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
