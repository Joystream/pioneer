import React from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { SuccessIcon } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader, SuccessModalBody } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'

import { RevealVoteModalCall } from './types'

export const RevealVoteSuccessModal = () => {
  const { hideModal, modalData } = useModal<RevealVoteModalCall>()
  const { voteForHandle } = modalData

  return (
    <Modal modalSize="m" modalHeight="s" onClose={hideModal}>
      <ModalHeader onClick={hideModal} title="Success" icon={<SuccessIcon />} />

      <SuccessModalBody>
        <TextMedium margin="l" light>
          You have just successfully revelead your vote for {voteForHandle}.
        </TextMedium>
      </SuccessModalBody>

      <ModalFooter>
        <ButtonGhost onClick={hideModal} size="medium">
          Back to Candidates
        </ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
