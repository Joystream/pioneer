import React, { useCallback } from 'react'
import { generatePath } from 'react-router'
import { useHistory } from 'react-router-dom'

import { ButtonGhost } from '@/common/components/buttons'
import { SuccessIcon } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader, SuccessModalBody } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { BackupVotesButton } from '@/council/components/election/BackupVotesButton'
import { ElectionRoutes } from '@/council/constants'
import { useCandidate } from '@/council/hooks/useCandidate'
import { SelectedMember } from '@/memberships/components/SelectMember'

interface Props {
  onClose: () => void
  candidateId: string
}

export const VoteForCouncilSuccessModal = ({ onClose, candidateId }: Props) => {
  const history = useHistory()
  const { candidate } = useCandidate(candidateId)

  const goToElection = useCallback(() => {
    history.push(generatePath(ElectionRoutes.currentElection))
    onClose()
  }, [onClose])

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />

      <SuccessModalBody>
        <TextMedium margin="l" light>
          You have just successfully voted for the Candidate. This is a good time to backup your votes.
        </TextMedium>
        <BackupVotesButton cycleId={candidate?.cycleId} /> ￼
        <SelectedMember size="l" member={candidate?.member} hideGroup />
      </SuccessModalBody>

      <ModalFooter>
        <ButtonGhost onClick={goToElection} size="medium">
          Back to Candidates
        </ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
