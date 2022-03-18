import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyHeaderButtonsProps } from '@/bounty/components/BountyPreviewHeader/types'
import { BountyWithdrawContributionModalCall } from '@/bounty/modals/WithdrawContributionModal'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

export const WithdrawContributionButton = React.memo(({ bounty, validMemberIds }: BountyHeaderButtonsProps) => {
  const { active } = useMyMemberships()
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const withdrawStakeModal = useCallback(() => {
    if (!active || !validMemberIds.includes(active.id)) {
      return showModal<SwitchMemberModalCall>({
        modal: 'SwitchMember',
        data: {
          noCreateButton: true,
          membersToShow: validMemberIds,
          originalModalName: 'BountyWithdrawContributionModal',
          originalModalData: {
            bounty,
          },
        },
      })
    }

    showModal<BountyWithdrawContributionModalCall>({
      modal: 'BountyWithdrawContributionModal',
      data: {
        bounty,
      },
    })
  }, [validMemberIds, active])

  return (
    <TransactionButton style="primary" size="large" onClick={withdrawStakeModal}>
      {t('buttons.contributorWithdrawStake')}
    </TransactionButton>
  )
})
