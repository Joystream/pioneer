import React from 'react'
import { useHistory } from 'react-router'

import { ProfileRoutes } from '@/app/constants/routes'
import { ButtonGhost } from '@/common/components/buttons'
import { SuccessIcon } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader, SuccessModalBody } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'

export const RecoverVoteStakeSuccessModal = () => {
  const { hideModal } = useModal()
  const history = useHistory()

  return (
    <Modal modalSize="m" modalHeight="s" onClose={hideModal}>
      <ModalHeader onClick={hideModal} title="Success" icon={<SuccessIcon />} />
      <SuccessModalBody>
        <TextMedium margin="l" light>
          Your stake amount was recovered successfully.
        </TextMedium>
      </SuccessModalBody>
      <ModalFooter>
        <ButtonGhost size="medium" onClick={() => history.push(ProfileRoutes.profile)}>
          Your account
        </ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
