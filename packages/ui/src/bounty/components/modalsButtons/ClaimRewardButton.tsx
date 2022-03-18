import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyHeaderButtonsProps } from '@/bounty/components/BountyPreviewHeader/types'
import { ClaimRewardModalCall } from '@/bounty/modals/ClaimRewardModal'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { BN_ZERO } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'

// interface Props {
//   bountyId: string
//   entryId: string
//   reward: BN
// }

export const ClaimRewardButton = React.memo(({ bounty }: BountyHeaderButtonsProps) => {
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const entryId = '1'
  const reward = BN_ZERO
  const submitWorkModal = useCallback(() => {
    showModal<ClaimRewardModalCall>({
      modal: 'ClaimReward',
      data: {
        bountyId: bounty.id,
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
})
