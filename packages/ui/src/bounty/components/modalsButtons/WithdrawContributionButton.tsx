import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyHeaderButtonsProps } from '@/bounty/components/BountyPreviewHeader/types'
import { BountyWithdrawContributionModalCall } from '@/bounty/modals/WithdrawContributionModal'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'

export const WithdrawContributionButton = React.memo(({ bounty }: BountyHeaderButtonsProps) => {
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const withdrawStakeModal = useCallback(() => {
    showModal<BountyWithdrawContributionModalCall>({
      modal: 'BountyWithdrawContributionModal',
      data: {
        bounty,
      },
    })
  }, [])

  return (
    <TransactionButton style="primary" size="large" onClick={withdrawStakeModal}>
      {t('buttons.contributorWithdrawStake')}
    </TransactionButton>
  )
})
