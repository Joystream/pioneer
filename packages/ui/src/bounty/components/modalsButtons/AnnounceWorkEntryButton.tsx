import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyHeaderButtonsProps } from '@/bounty/components/BountyPreviewHeader/types'
import { BountyAnnounceWorkEntryModalCall } from '@/bounty/modals/AnnounceWorkEntryModal'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'

export const AnnounceWorkEntryButton = React.memo(({ bounty }: BountyHeaderButtonsProps) => {
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
