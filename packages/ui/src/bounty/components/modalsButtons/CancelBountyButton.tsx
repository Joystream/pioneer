import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyHeaderButtonsProps } from '@/bounty/components/BountyPreviewHeader/types'
import { BountyCancelModalCall } from '@/bounty/modals/CancelBountyModal'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

export const CancelBountyButton = React.memo(({ bounty, validMemberIds }: BountyHeaderButtonsProps) => {
  const { active } = useMyMemberships()
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const { members } = useMyMemberships()
  const bountyCancelModal = useCallback(() => {
    if (!active || !validMemberIds.includes(active.id)) {
      return showModal<SwitchMemberModalCall>({
        modal: 'SwitchMember',
        data: {
          noCreateButton: true,
          membersToShow: validMemberIds,
          originalModalName: 'BountyCancel',
          originalModalData: {
            bounty,
            creator: bounty.creator ?? members[0], // todo make creator optional
          },
        },
      })
    }

    showModal<BountyCancelModalCall>({
      modal: 'BountyCancel',
      data: {
        bounty,
        creator: bounty.creator ?? members[0],
      },
    })
  }, [validMemberIds, active])

  return (
    <TransactionButton style="primary" size="large" onClick={bountyCancelModal}>
      {t('buttons.cancelBounty')}
    </TransactionButton>
  )
})
