import React from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { SuccessSymbol } from '@/common/components/icons/symbols'
import { Info } from '@/common/components/Info'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextInlineMedium, TextMedium } from '@/common/components/typography'
import { VoteStatus } from '@/proposals/modals/VoteForProposal/machine'

interface SuccessModalProps {
  onClose: () => void
  voteStatus: VoteStatus
  proposalTitle: string
}

export const SuccessModal = ({ onClose, voteStatus, proposalTitle }: SuccessModalProps) => {
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
        <ButtonGhost size="medium">See my Proposal</ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
