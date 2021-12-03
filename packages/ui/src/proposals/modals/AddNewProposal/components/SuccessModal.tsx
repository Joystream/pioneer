import React, { useCallback } from 'react'
import { generatePath, useHistory } from 'react-router-dom'

import { ButtonGhost } from '@/common/components/buttons'
import { SuccessSymbol } from '@/common/components/icons/symbols'
import { Info } from '@/common/components/Info'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { camelCaseToText } from '@/common/helpers'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { ProposalType } from '@/proposals/types'

interface SuccessModalProps {
  onClose: () => void
  proposalId: number
  proposalType: ProposalType
  proposalTitle: string
}

export const SuccessModal = ({ onClose, proposalId, proposalType, proposalTitle }: SuccessModalProps) => {
  const history = useHistory()
  const openProposal = useCallback(() => {
    history.push(generatePath(ProposalsRoutes.preview, { id: proposalId }))
    onClose()
  }, [onClose, proposalId])

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
        <ButtonGhost size="medium" onClick={openProposal}>
          See my Proposal
        </ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
