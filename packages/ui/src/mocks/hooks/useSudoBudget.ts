import { useMemo } from 'react'

import { info } from '@/common/logger'

import { useMyAccounts } from '../../accounts/hooks/useMyAccounts'
import { useApi } from '../../common/hooks/useApi'
import { useObservable } from '../../common/hooks/useObservable'
import { useSignAndSendTransaction } from '../../common/hooks/useSignAndSendTransaction'

const BUDGET = 100

export function useSudoBudget() {
  const { api, isConnected } = useApi()
  const { hasAccounts } = useMyAccounts()
  const budget = useObservable(api?.query.membershipWorkingGroup.budget(), [isConnected])

  useMemo(() => {
    if (budget !== undefined) {
      info(`💸 Current Membership WG budget: ${budget} JOY`)
    }
  }, [JSON.stringify(budget)])

  const budgetTransaction = useMemo(() => {
    if (!api) {
      return
    }
    return api.tx.sudo.sudo(api.tx.membershipWorkingGroup.setBudget(BUDGET))
  }, [api])

  const { send: sendBudget } = useSignAndSendTransaction({
    transaction: budgetTransaction,
    signer: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    onDone: (success) => {
      info(success ? `💰 Budget increased to: ${BUDGET} JOY` : '❗️Error processing sudo transaction')
    },
  })

  const addStakeTransaction = useMemo(() => {
    return (
      api &&
      api.tx.utility.batch([
        api.tx.members.addStakingAccountCandidate(0),
        api.tx.members.confirmStakingAccount(0, '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'),
      ])
    )
  }, [api])
  const { send: addStake } = useSignAndSendTransaction({
    transaction: addStakeTransaction,
    signer: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    onDone: (success) => {
      info(success ? '✅ Adding stake' : '❗️Error adding stake')
    },
  })

  useMemo(() => {
    if (!IS_DEVELOPMENT || !(api && isConnected && hasAccounts)) {
      return
    }

    info('🤑 Increasing Membership Working Group budget')
    sendBudget()
    info('📖 Stake added')
    addStake()
  }, [isConnected, hasAccounts])
}
