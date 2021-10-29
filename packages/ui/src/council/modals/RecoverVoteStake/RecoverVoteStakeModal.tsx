import { useMachine } from '@xstate/react'
import React, { useEffect, useMemo } from 'react'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { FailureModal } from '@/common/components/FailureModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { isDefined } from '@/common/utils'

import { RecoverVoteStakeModalCall } from '.'
import { recoverVoteStakeMachine } from './machine'
import { RecoverVoteStakeSignModal } from './RecoverVoteStakeSignModal'

export const RecoverVoteStakeModal = () => {
  const [state, send] = useMachine(recoverVoteStakeMachine)
  const { api } = useApi()
  const {
    hideModal,
    modalData: { address },
  } = useModal<RecoverVoteStakeModalCall>()
  const transaction = useMemo(() => api?.tx.referendum.releaseVoteStake(), [])
  const feeInfo = useTransactionFee(address, transaction)
  useEffect(() => {
    if (state.matches('requirementsVerification') && isDefined(feeInfo?.canAfford)) {
      send(feeInfo?.canAfford ? 'PASS' : 'FAIL')
    }
  }, [feeInfo, state.value])

  if (!feeInfo || !transaction) return null

  if (state.matches('requirementsFailed')) {
    return <InsufficientFundsModal onClose={hideModal} address={address} amount={feeInfo.transactionFee} />
  }

  if (transaction && state.matches('transaction')) {
    return <RecoverVoteStakeSignModal transaction={transaction} service={state.children.transaction} />
  }

  return null
}
