import { useMemo } from 'react'

import { useAccounts } from '../../accounts/hooks/useAccounts'
import { useApi } from '../../common/hooks/useApi'
import { useObservable } from '../../common/hooks/useObservable'
import { useSignAndSendTransaction } from '../../common/hooks/useSignAndSendTransaction'

const BUDGET = 100

export function useSudoBudget() {
  const { api, isConnected } = useApi()
  const { hasAccounts } = useAccounts()
  const budget = useObservable(api?.query.membershipWorkingGroup.budget(), [isConnected])

  useMemo(() => {
    if (budget !== undefined) {
      console.log(`💸 Current Membership WG budget: ${budget} JOY`)
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
      console.log(success ? `💰 Budget increased to: ${BUDGET} JOY` : '❗️Error processing sudo transaction')
    },
  })

  useMemo(() => {
    if (!IS_DEVELOPMENT || !(api && isConnected && hasAccounts)) {
      return
    }

    console.log('🤑 Increasing Membership Working Group budget')
    sendBudget()
  }, [isConnected, hasAccounts])
}
