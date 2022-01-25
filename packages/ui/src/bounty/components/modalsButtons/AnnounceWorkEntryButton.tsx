import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyAnnounceWorkEntryModalCall } from '@/bounty/modals/AnnounceWorkEntryModal'
import { Bounty } from '@/bounty/types/Bounty'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'

interface Props {
  bounty: Bounty
}

export const AnnounceWorkEntryButton = React.memo(({ bounty }: Props) => {
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const announceWorkEntryModal = useCallback(() => {
    showModal<BountyAnnounceWorkEntryModalCall>({
      modal: 'BountyAnnounceWorkEntryModal',
      data: {
        bounty,
      },
    })
  }, [])

  return (
    <TransactionButton style="primary" size="large" onClick={announceWorkEntryModal}>
      {t('buttons.announceEntry')}
    </TransactionButton>
  )
})
