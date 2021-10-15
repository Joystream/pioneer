import React from 'react'

import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { SuccessIcon } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader, SuccessModalBody } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { CouncilRoutes } from '@/council/constants'
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

        <SelectedMember size="l" member={candidate?.member} showGroup={false} />
      </SuccessModalBody>

      <ModalFooter>
        <LinkButtonGhost to={CouncilRoutes.currentElection} size="medium">
          See my Vote
        </LinkButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
