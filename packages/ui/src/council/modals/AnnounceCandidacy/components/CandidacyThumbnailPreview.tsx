import React from 'react'

import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import {
  ModalFooter,
  ModalHeader,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
} from '@/common/components/Modal'
import { CandidateCard } from '@/council/components/election/CandidateCard/CandidateCard'
import { CandidateWithDetails } from '@/council/types'

interface CandidacyThumbnailPreviewProps {
  candidate: CandidateWithDetails
  closeModal: () => void
}

export const CandidacyThumbnailPreview = ({ candidate, closeModal }: CandidacyThumbnailPreviewProps) => {
  return (
    <ScrolledModal onClose={closeModal} modalSize="l" modalHeight="l">
      <ModalHeader onClick={closeModal} title="Candidacy Thumbnail Preview" />
      <ScrolledModalBody>
        <ScrolledModalContainer>
          <CandidateCard
            id="0"
            member={candidate.member}
            title={candidate.title}
            infolist={candidate.description}
            stake={candidate.stake}
            isPreview
          />
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalFooter>
        <ButtonsGroup align="right">
          <ButtonGhost size="medium" onClick={closeModal}>
            <Arrow direction="left" />
            Close
          </ButtonGhost>
        </ButtonsGroup>
      </ModalFooter>
    </ScrolledModal>
  )
}
