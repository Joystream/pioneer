import { decodeAddress } from '@polkadot/util-crypto'
import React, { ReactNode } from 'react'
import { debounceTime, filter, map, of } from 'rxjs'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { useKeyring } from '@/common/hooks/useKeyring'
import { useObservable } from '@/common/hooks/useObservable'

import { Account } from '../../types'

import { AccountsContext } from './context'
import { UseWallets, useWallets } from './useWallets'

export type UseAccounts = UseWallets & {
  allAccounts: Account[]
  hasAccounts: boolean
  isLoading: boolean
}

interface Props {
  children: ReactNode
}

export const AccountsContextProvider = (props: Props) => {
  const keyring = useKeyring()

  const { allWallets, wallet, setWallet, error } = useWallets()

  const allAccounts: Account[] | undefined = useObservable(() => {
    if (!wallet) return of(undefined)

    return keyring.accounts.subject.asObservable().pipe(
      debounceTime(200),
      filter((accounts) => !!accounts),
      map((accounts) =>
        Object.values(accounts).map((account) => {
          const publicKey = decodeAddress(account.json.address)
          return {
            address: encodeAddress(publicKey),
            name: account.json.meta.name,
            source: account.json.meta.source as string,
          }
        })
      )
    )
  }, [keyring, wallet])

  const hasAccounts = allAccounts?.length !== 0

  const value: UseAccounts = {
    allAccounts: allAccounts ?? [],
    hasAccounts,
    isLoading: !!wallet && !allAccounts && !error,
    wallet,
    setWallet,
    allWallets,
    error,
  }

  return <AccountsContext.Provider value={value}>{props.children}</AccountsContext.Provider>
}
