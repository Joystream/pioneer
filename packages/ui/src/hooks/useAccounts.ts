import { Account } from '../common/types'
import { useKeyring } from './useKeyring'
import { useObservable } from './useObservable'

interface UseAccounts {
  allAccounts: Account[]
  hasAccounts: boolean
}

export function useAccounts(): UseAccounts {
  const keyring = useKeyring()
  const accounts = useObservable(keyring.accounts.subject.asObservable(), [keyring])

  const allAccounts: Account[] = []

  if (accounts) {
    allAccounts.push(
      ...Object.values(accounts).map((account) => ({
        address: account.json.address,
        name: account.json.meta.name,
      }))
    )
  }

  const hasAccounts = allAccounts.length !== 0

  return { allAccounts, hasAccounts }
}
