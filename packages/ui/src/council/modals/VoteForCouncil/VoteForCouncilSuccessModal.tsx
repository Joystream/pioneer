import React from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { SuccessIcon } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader, SuccessModalBody } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { useCandidate } from '@/council/hooks/useCandidate'
import { SelectedMember } from '@/memberships/components/SelectMember'

import { VoteForCouncilModalCall } from './types'

export const VoteForCouncilSuccessModal = () => {
  const { hideModal, modalData } = useModal<VoteForCouncilModalCall>()
  const { candidate } = useCandidate(modalData.id)

  return (
    <Modal modalSize="m" modalHeight="s" onClose={hideModal}>
      <ModalHeader onClick={hideModal} title="Success" icon={<SuccessIcon />} />

      <SuccessModalBody>
        <TextMedium margin="l" light>
          You have just successfully voted for the Candidate
        </TextMedium>
        <SelectedMember member={candidate?.member} />
      </SuccessModalBody>

      <ModalFooter>
        <ButtonGhost size="medium">See my Announcement</ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
