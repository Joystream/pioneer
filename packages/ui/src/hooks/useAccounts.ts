import { useEffect, useState } from 'react'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
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
      subscription.unsubscribe()
    }
  }, [keyring])

  useEffect(() => {
    web3Enable('Pioneer')
      .then(() => web3Accounts())
      .then((injectedAccounts) => {
        const allAccounts = injectedAccounts.map(({ address, meta }) => ({
          address,
          meta: { ...meta, name: `${meta.name} (${meta.source})` },
        }))
        keyring.loadAll({ isDevelopment: true }, allAccounts)
      })
  }, [])

  return state
}
