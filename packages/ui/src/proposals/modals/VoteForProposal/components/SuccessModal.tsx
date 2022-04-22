import React, { useCallback } from 'react'
import { useHistory, generatePath } from 'react-router-dom'

import { ButtonGhost } from '@/common/components/buttons'
import { SuccessSymbol } from '@/common/components/icons/symbols'
import { Info } from '@/common/components/Info'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextInlineMedium, TextMedium } from '@/common/components/typography'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { VoteStatus } from '@/proposals/modals/VoteForProposal/machine'

interface SuccessModalProps {
  onClose: () => void
  voteStatus: VoteStatus
  proposalId: string
  proposalTitle: string
}

export const SuccessModal = ({ onClose, voteStatus, proposalId, proposalTitle }: SuccessModalProps) => {
  const history = useHistory()
  const openProposals = useCallback(() => {
    history.push(generatePath(ProposalsRoutes.home))
    onClose()
  }, [onClose, proposalId])

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessSymbol />} />
      <ModalBody>
        <Info>
          <TextMedium light>
            You have just successfully <TextInlineMedium bold>{voteStatus}</TextInlineMedium> proposal “{proposalTitle}
            ”.
          </TextMedium>
        </Info>
      </ModalBody>
      <ModalFooter>
        <ButtonGhost size="medium" onClick={openProposals}>
          Back to proposals
        </ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
