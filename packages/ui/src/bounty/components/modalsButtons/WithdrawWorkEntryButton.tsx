import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyHeaderButtonsProps } from '@/bounty/components/BountyPreviewHeader/types'
import { BountyWithdrawWorkEntryModalCall } from '@/bounty/modals/WithdrawWorkEntryModal'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

export const WithdrawWorkEntryButton = React.memo(({ bounty, validMemberIds }: BountyHeaderButtonsProps) => {
  const { active } = useMyMemberships()
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const withdrawWorkEntryModal = useCallback(() => {
    if (!active || !validMemberIds.includes(active.id)) {
      return showModal<SwitchMemberModalCall>({
        modal: 'SwitchMember',
        data: {
          noCreateButton: true,
          membersToShow: validMemberIds,
          originalModalName: 'BountyWithdrawWorkEntryModal',
          originalModalData: { bounty },
        },
      })
    }

    showModal<BountyWithdrawWorkEntryModalCall>({
      modal: 'BountyWithdrawWorkEntryModal',
      data: { bounty },
    })
  }, [validMemberIds, active])

  return (
    <TransactionButton style="secondary" size="large" onClick={withdrawWorkEntryModal}>
      <PlusIcon />
      {t('buttons.withdrawWorkEntry')}
    </TransactionButton>
  )
})
