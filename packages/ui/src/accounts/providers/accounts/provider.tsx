import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { Keyring } from '@polkadot/ui-keyring'
import { decodeAddress } from '@polkadot/util-crypto'
import React, { ReactNode, useEffect, useState } from 'react'
import { debounceTime, filter, skip } from 'rxjs/operators'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { Wallet } from '@/accounts/types/wallet'
import { useKeyring } from '@/common/hooks/useKeyring'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useObservable } from '@/common/hooks/useObservable'

import { Account } from '../../types'

import { AccountsContext } from './context'
import { useWallets } from './useWallets'

type ExtensionError = 'NO_EXTENSION' | 'APP_REJECTED'

export interface UseAccounts {
  allAccounts: Account[]
  hasAccounts: boolean
  isLoading: boolean
  error?: ExtensionError
  allWallets: Wallet[]
  wallet?: Wallet
  setWallet?: (wallet: Wallet | undefined) => void
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

const loadKeysFromExtension = async (keyring: Keyring, wallet: Wallet) => {
  await wallet.enable('Pioneer')

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
  const allWallets = useWallets()
  const [isExtensionLoaded, setIsExtensionLoaded] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<Wallet>()
  const [extensionError, setExtensionError] = useState<ExtensionError>()
  const [recentWallet, setRecentWallet] = useLocalStorage<string | undefined>('recentWallet')

  useEffect(() => {
    setIsExtensionLoaded(true)
    const cachedWallet = recentWallet && allWallets.find((wallet) => wallet.extensionName === recentWallet)
    if (cachedWallet) setSelectedWallet(cachedWallet)
  }, [allWallets])

  useEffect(() => {
    if (!isExtensionLoaded || !selectedWallet) {
      return
    }

    setExtensionError(undefined)
    loadKeysFromExtension(keyring, selectedWallet)
      .then(() => {
        setRecentWallet(selectedWallet.extensionName)
      })
      .catch((error: Error) => {
        setSelectedWallet(undefined)

        if (error?.message.includes('not allowed to interact') || error?.message.includes('Rejected')) {
          setExtensionError('APP_REJECTED')
        }
      })
  }, [isExtensionLoaded, selectedWallet])

  const accounts = useObservable(
    () =>
      keyring.accounts.subject.asObservable().pipe(
        debounceTime(20),
        filter((accounts) => !!accounts),
        skip(1)
      ),
    [keyring]
  )
  const allAccounts: Account[] = []

  if (accounts && selectedWallet) {
    allAccounts.push(
      ...Object.values(accounts).map((account) => {
        const publicKey = decodeAddress(account.json.address)
        return {
          address: encodeAddress(publicKey),
          name: account.json.meta.name,
          source: account.json.meta.source as string,
        }
      })
    )
  }

  const hasAccounts = allAccounts.length !== 0

  const value: UseAccounts = {
    allAccounts,
    hasAccounts,
    isLoading: !isExtensionLoaded || !accounts,
    setWallet: setSelectedWallet,
    wallet: selectedWallet,
    allWallets,
    error: extensionError,
  }

  if (extensionError || !selectedWallet?.extension) {
    value.isLoading = false
  }

  return <AccountsContext.Provider value={value}>{props.children}</AccountsContext.Provider>
}
