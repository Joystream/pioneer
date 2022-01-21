import BN from 'bn.js'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ClaimRewardModalCall } from '@/bounty/modals/ClaimRewardModal'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'

interface Props {
  bountyId: string
  entryId: string
  reward: BN
}

export const ClaimRewardButton = ({ bountyId, entryId, reward }: Props) => {
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const submitWorkModal = useCallback(() => {
    showModal<ClaimRewardModalCall>({
      modal: 'ClaimReward',
      data: {
        bountyId,
        entryId,
        reward,
      },
    })
  }, [])

  return (
    <TransactionButton style="primary" size="large" onClick={submitWorkModal}>
      {t('buttons.claimReward')}
    </TransactionButton>
  )
}
