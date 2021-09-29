import React, { useCallback } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { useModal } from '@/common/hooks/useModal'
import { AnnounceCandidateModalCall } from '@/council/modals/AnnounceCandidacy'

export const AnnounceCandidacyButton = () => {
  const { showModal } = useModal()
  const showAnnounceCandidateModal = useCallback(() => {
    showModal<AnnounceCandidateModalCall>({
      modal: 'AnnounceCandidateModal',
    })
  }, [])

  return (
    <ButtonPrimary size="medium" onClick={showAnnounceCandidateModal}>
      Announce Candidacy
    </ButtonPrimary>
  )
}
