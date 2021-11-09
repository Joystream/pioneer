import React, { useCallback } from 'react'

import { TransactionButton } from '@/common/components/buttons/TransactionButton'
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
    <TransactionButton style="primary" size="medium" onClick={showAnnounceCandidateModal}>
      Announce Candidacy
    </TransactionButton>
  )
}
