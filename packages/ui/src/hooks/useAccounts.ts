import { useEffect, useState } from 'react'
import { useKeyring } from './useKeyring'
import { Account } from './types'

interface UseAccounts {
  allAccounts: Account[]
  hasAccounts: boolean
}

export function useAccounts(): UseAccounts {
  const keyring = useKeyring()
  const [state, setState] = useState<UseAccounts>({ allAccounts: [], hasAccounts: false })

  useEffect(() => {
    const subscription = keyring.accounts.subject.subscribe((accounts): void => {
      const allAccounts = accounts
        ? Object.values(accounts).map((account) => ({
            address: account.json.address,
            name: account.json.meta.name,
          }))
        : []
      const hasAccounts = allAccounts.length !== 0

      setState({ allAccounts, hasAccounts })
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [keyring])

  return state
}
