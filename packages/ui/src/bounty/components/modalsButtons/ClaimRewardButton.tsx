import BN from 'bn.js'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyHeaderButtonsProps } from '@/bounty/components/BountyPreviewHeader/types'
import { ClaimRewardModalCall } from '@/bounty/modals/ClaimRewardModal'
import { isBountyEntryStatusWinner, WorkEntry } from '@/bounty/types/Bounty'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { BN_ZERO } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

const getReward = (entry: WorkEntry) => {
  return isBountyEntryStatusWinner(entry.status) ? new BN(entry.status.reward) : BN_ZERO
}

export const ClaimRewardButton = React.memo(({ bounty, validMemberIds }: BountyHeaderButtonsProps) => {
  const { active } = useMyMemberships()
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()

  const submitWorkModal = useCallback(() => {
    if (!active || !validMemberIds.includes(active.id)) {
      return showModal<SwitchMemberModalCall>({
        modal: 'SwitchMember',
        data: {
          noCreateButton: true,
          membersToShow: validMemberIds,
        },
      })
    }

    const entry = bounty.entries?.find((entry) => entry.worker.id === active.id)
    if (entry) {
      showModal<ClaimRewardModalCall>({
        modal: 'ClaimReward',
        data: {
          bountyId: bounty.id,
          entryId: entry.id ?? '-1',
          reward: getReward(entry),
        },
      })
    }
  }, [validMemberIds, active])

  return (
    <TransactionButton style="primary" size="large" onClick={submitWorkModal}>
      {t('buttons.claimReward')}
    </TransactionButton>
  )
})
