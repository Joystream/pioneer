import { useEffect, useState } from 'react'
import { useKeyring } from './useKeyring'

export interface Account {
  name: string | undefined
  address: string
}

interface UseAccounts {
  allAccounts: Account[]
  hasAccounts: boolean
}

export function useAccounts(): UseAccounts {
  const keyring = useKeyring()
  const [state, setState] = useState<UseAccounts>({ allAccounts: [], hasAccounts: false })

  useEffect((): (() => void) => {
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

    return (): void => {
      setTimeout(() => subscription.unsubscribe(), 0)
    }
  }, [keyring])

  return state
}
