import React from 'react'
import { useHistory } from 'react-router-dom'

import { ButtonGhost } from '@/common/components/buttons'
import { SuccessSymbol } from '@/common/components/icons/symbols'
import { Info } from '@/common/components/Info'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { ElectionRoutes } from '@/council/constants'
import { useCandidateIdByMember } from '@/council/hooks/useCandidateIdByMember'

interface SuccessModalProps {
  onClose: () => void
  memberId: string
}

export const SuccessModal = ({ onClose, memberId }: SuccessModalProps) => {
  const { isLoading, candidateId } = useCandidateIdByMember(memberId)
  const history = useHistory()

  const redirect = () => {
    onClose()
    history.push(`${ElectionRoutes.currentElection}?candidate=${candidateId}`)
  }

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessSymbol />} />
      <ModalBody>
        <Info>
          <TextMedium light>You have just successfully announced candidacy.</TextMedium>
        </Info>
      </ModalBody>
      <ModalFooter>
        <ButtonGhost onClick={redirect} size="medium" disabled={isLoading || !candidateId}>
          See my Announcement
        </ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
