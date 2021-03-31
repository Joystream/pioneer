import { useEffect, useMemo } from 'react'
import { Account } from '../common/types'
import { useAccounts } from '../hooks/useAccounts'
import { useApi } from '../hooks/useApi'
import { useObservable } from '../hooks/useObservable'
import { useSignAndSendTransaction } from '../hooks/useSignAndSendTransaction'

const BUDGET = 100

export function useSudoBudget() {
  const { api, isConnected } = useApi()
  const { hasAccounts } = useAccounts()
  const budget = useObservable(api?.query.membershipWorkingGroup.budget(), [isConnected])

  console.log(`💸 Current Membership WG budget: ${budget} JOY`)

  const budgetTransaction = useMemo(() => {
    if (!api) {
      return
    }
    return api.tx.sudo.sudo(api.tx.membershipWorkingGroup.setBudget(BUDGET))
  }, [api])

  const from: Account = { address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', name: 'signer' }

  const { send: sendBudget } = useSignAndSendTransaction({
    transaction: budgetTransaction,
    from,
    onDone: (success) => {
      console.log(success ? `💰 Budget increased to: ${BUDGET} JOY` : '❗️Error processing sudo transaction')
    },
  })

  useEffect(() => {
    if (!IS_DEVELOPMENT || !(api && isConnected && hasAccounts)) {
      return
    }

    console.log('🤑 Increasing Membership Working Group budget')
    sendBudget()
  }, [isConnected, hasAccounts])
}
