import React from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { SuccessSymbol } from '@/common/components/icons/symbols'
import { Info } from '@/common/components/Info'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { camelCaseToText } from '@/common/helpers'
import { ProposalType } from '@/proposals/types'

interface SuccessModalProps {
  onClose: () => void
  proposalType: ProposalType
  proposalTitle: string
}

export const SuccessModal = ({ onClose, proposalType, proposalTitle }: SuccessModalProps) => {
  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessSymbol />} />
      <ModalBody>
        <Info>
          <TextMedium light>
            You have just successfully created {camelCaseToText(proposalType)} proposal “{proposalTitle}”.
          </TextMedium>
        </Info>
      </ModalBody>
      <ModalFooter>
        <ButtonGhost size="medium">See my Proposal</ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
