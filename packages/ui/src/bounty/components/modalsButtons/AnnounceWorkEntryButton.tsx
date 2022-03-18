import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyHeaderButtonsProps } from '@/bounty/components/BountyPreviewHeader/types'
import { BountyAnnounceWorkEntryModalCall } from '@/bounty/modals/AnnounceWorkEntryModal'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

export const AnnounceWorkEntryButton = React.memo(({ bounty, validMemberIds }: BountyHeaderButtonsProps) => {
  const { active } = useMyMemberships()
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const announceWorkEntryModal = useCallback(() => {
    if (!active || !validMemberIds.includes(active.id)) {
      return showModal<SwitchMemberModalCall>({
        modal: 'SwitchMember',
        data: {
          noCreateButton: true,
          membersToShow: validMemberIds,
          originalModalName: 'BountyAnnounceWorkEntryModal',
          originalModalData: {
            bounty,
          },
        },
      })
    }

    showModal<BountyAnnounceWorkEntryModalCall>({
      modal: 'BountyAnnounceWorkEntryModal',
      data: {
        bounty,
      },
    })
  }, [validMemberIds, active])

  return (
    <TransactionButton style="primary" size="large" onClick={announceWorkEntryModal}>
      {t('buttons.announceEntry')}
    </TransactionButton>
  )
})
