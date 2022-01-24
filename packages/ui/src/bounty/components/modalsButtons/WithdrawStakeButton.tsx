import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { WithdrawStakeModalCall } from '@/bounty/modals/WithdrawalStakeModal'
import { Bounty } from '@/bounty/types/Bounty'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'

interface Props {
  bounty: Bounty
  lost?: boolean
}

export const WithdrawStakeButton = React.memo(({ bounty, lost }: Props) => {
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
      {lost ? t('buttons.loserWithdrawStake') : t('buttons.contributorWithdrawStake')}
    </TransactionButton>
  )
})
