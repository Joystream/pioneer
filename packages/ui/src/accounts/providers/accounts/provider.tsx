import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { Keyring } from '@polkadot/ui-keyring'
import { decodeAddress } from '@polkadot/util-crypto'
import { Wallet } from 'injectweb3-connect'
import React, { ReactNode, useEffect } from 'react'
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

function isKeyringLoaded(keyring: Keyring) {
  try {
    return !!keyring.keyring
  } catch {
    return false
  }
}

const loadKeysFromWallet = async (keyring: Keyring, wallet: Wallet) => {
  const injectedAccounts = await wallet.getAccounts()

  if (!isKeyringLoaded(keyring)) {
    keyring.loadAll({ isDevelopment: false }, injectedAccounts.map(wallet.walletAccountToInjectedAccountWithMeta))
  }

  await wallet.subscribeAccounts((accounts) => {
    const current = keyring.getAccounts()

    const addresses = accounts?.map(({ address }) => address) ?? []

    current.forEach(({ address }) => {
      if (!addresses.includes(address)) {
        keyring.forgetAccount(address)
      }
    })

    accounts
      ?.map(wallet.walletAccountToInjectedAccountWithMeta)
      .forEach((injected: InjectedAccountWithMeta) => keyring.addExternal(injected.address, injected.meta))
  })
}

export const AccountsContextProvider = (props: Props) => {
  const keyring = useKeyring()

  const { allWallets, wallet, setWallet, walletState } = useWallets()

  useEffect(() => {
    if (wallet) loadKeysFromWallet(keyring, wallet)
  }, [keyring, wallet])

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

  const hasAccounts = !!allAccounts?.length

  const value: UseAccounts = {
    allAccounts: allAccounts ?? [],
    hasAccounts,
    isLoading: walletState === 'READY' && !allAccounts,
    wallet,
    setWallet,
    allWallets,
    walletState,
  }

  return <AccountsContext.Provider value={value}>{props.children}</AccountsContext.Provider>
}
