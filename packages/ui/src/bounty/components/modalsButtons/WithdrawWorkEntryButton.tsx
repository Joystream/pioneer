import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyWithdrawWorkEntryModalCall } from '@/bounty/modals/WithdrawWorkEntryModal'
import { Bounty, WorkEntry } from '@/bounty/types/Bounty'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { useModal } from '@/common/hooks/useModal'

interface Props {
  bounty: Bounty
  entry: WorkEntry
}

export const WithdrawWorkEntryButton = ({ bounty, entry }: Props) => {
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const withdrawWorkEntryModal = useCallback(() => {
    showModal<BountyWithdrawWorkEntryModalCall>({
      modal: 'BountyWithdrawWorkEntryModal',
      data: {
        bounty,
        entry,
      },
    })
  }, [])

  return (
    <TransactionButton style="secondary" size="large" onClick={withdrawWorkEntryModal}>
      <PlusIcon />
      {t('buttons.withdrawWorkEntry')}
    </TransactionButton>
  )
}
