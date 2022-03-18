import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyHeaderButtonsProps } from '@/bounty/components/BountyPreviewHeader/types'
import { WithdrawStakeModalCall } from '@/bounty/modals/WithdrawalStakeModal'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'

export const WithdrawStakeButton = React.memo(({ bounty }: BountyHeaderButtonsProps) => {
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const withdrawStakeModal = useCallback(() => {
    showModal<WithdrawStakeModalCall>({
      modal: 'WithdrawStakeModal',
      data: {
        bounty,
      },
    })
  }, [])

  return (
    <TransactionButton style="primary" size="large" onClick={withdrawStakeModal}>
      {t('buttons.loserWithdrawStake')}
    </TransactionButton>
  )
})
