import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { WithdrawStakeModalCall } from '@/bounty/modals/WithdrawalStakeModal'
import { Bounty } from '@/bounty/types/Bounty'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'

interface Props {
  statusLost: boolean
  bounty: Bounty
}

export const WithdrawStakeButtonButton = ({ statusLost, bounty }: Props) => {
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const submitWorkModal = useCallback(() => {
    showModal<WithdrawStakeModalCall>({
      modal: 'WithdrawStakeModal',
      data: {
        bounty,
      },
    })
  }, [])

  return (
    <TransactionButton style="primary" size="large" onClick={submitWorkModal}>
      {statusLost ? t('buttons.loserWithdrawStake') : t('buttons.entrantWithdrawStake')}
    </TransactionButton>
  )
}
