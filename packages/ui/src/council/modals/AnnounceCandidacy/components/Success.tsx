import React from 'react'
import { generatePath } from 'react-router-dom'

import { ButtonGhost } from '@/common/components/buttons'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { SuccessSymbol } from '@/common/components/icons/symbols'
import { Info } from '@/common/components/Info'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { CouncilRoutes } from '@/council/constants'
import { useCandidateIdByMember } from '@/council/hooks/useCandidateIdByMember'

interface SuccessModalProps {
  onClose: () => void
  memberId: string
}

export const SuccessModal = ({ onClose, memberId }: SuccessModalProps) => {
  const { isLoading, candidateId } = useCandidateIdByMember(memberId)

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessSymbol />} />
      <ModalBody>
        <Info>
          <TextMedium light>You have just successfully announced candidacy.</TextMedium>
        </Info>
      </ModalBody>
      <ModalFooter>
        <LinkButtonGhost
          size="medium"
          disabled={isLoading}
          to={`${CouncilRoutes.currentElection}?candidate=${candidateId}`}
        >
          See my Announcement
        </LinkButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
