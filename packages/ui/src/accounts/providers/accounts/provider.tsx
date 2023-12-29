import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { Keyring } from '@polkadot/ui-keyring'
import { decodeAddress } from '@polkadot/util-crypto'
import { getWalletBySource, Wallet } from 'injectweb3-connect'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { debounceTime, filter, skip } from 'rxjs/operators'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { useKeyring } from '@/common/hooks/useKeyring'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useObservable } from '@/common/hooks/useObservable'

import { Account } from '../../types'

import { AccountsContext } from './context'

type ExtensionError = 'NO_EXTENSION' | 'APP_REJECTED'

export interface UseAccounts {
  allAccounts: Account[]
  hasAccounts: boolean
  isLoading: boolean
  error?: ExtensionError
  wallet?: Wallet
  setWallet?: (wallet: Wallet | undefined) => void
  isWalletConnected: boolean
  isConnectingWallet: boolean
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

// Extensions is not always ready on application load, hence the check
const onExtensionLoaded =
  (onSuccess: (foundWallets: string[]) => void, onFail: () => void, recentWallet?: string) => () => {
    const interval = 20
    const timeout = 1000
    let timeElapsed = 0

    const intervalId = setInterval(() => {
      const extensionsKeys = Object.keys((window as any)?.injectedWeb3 ?? {})
      if (extensionsKeys.length) {
        if (!recentWallet) {
          clearInterval(intervalId)
          onSuccess(extensionsKeys)
        } else if (extensionsKeys.includes(recentWallet)) {
          // some wallets load slower which will cause error when trying to preload them hence the check
          clearInterval(intervalId)
          onSuccess(extensionsKeys)
        } else if (timeElapsed >= timeout) {
          // if wallet in storage was disabled we don't want to wait for it too long
          clearInterval(intervalId)
          onSuccess(extensionsKeys)
        }
        timeElapsed += interval
      } else {
        timeElapsed += interval
        if (timeElapsed >= timeout) {
          clearInterval(intervalId)
          onFail()
        }
      }
    }, interval)

    return () => clearInterval(intervalId)
  }

export const AccountsContextProvider = (props: Props) => {
  const keyring = useKeyring()
  const [isExtensionLoaded, setIsExtensionLoaded] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<Wallet>()
  const [extensionError, setExtensionError] = useState<ExtensionError>()
  const [recentWallet, setRecentWallet] = useLocalStorage<string | undefined>('recentWallet')
  const [isConnectingWallet, setIsConnectingWallet] = useState(false)

  useEffect(
    onExtensionLoaded(
      (foundWallets) => {
        setIsExtensionLoaded(true)
        if (recentWallet && foundWallets.includes(recentWallet)) {
          const possibleWallet = getWalletBySource(recentWallet)
          setSelectedWallet(possibleWallet)
        }
      },
      () => setExtensionError('NO_EXTENSION'),
      recentWallet
    ),
    []
  )

  const handleSetWallet = useCallback(
    async (wallet?: Wallet) => {
      setSelectedWallet(wallet)

      if (!isExtensionLoaded || !wallet) return

      setExtensionError(undefined)
      setIsConnectingWallet(true)
      try {
        await loadKeysFromExtension(keyring, wallet)
        setRecentWallet(wallet.extensionName)
      } catch (error) {
        setSelectedWallet(undefined)

        if (error?.message.includes('not allowed to interact') || error?.message.includes('Rejected')) {
          setExtensionError('APP_REJECTED')
        }
      }
      setIsConnectingWallet(false)
    },
    [isExtensionLoaded]
  )

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
    setWallet: handleSetWallet,
    wallet: selectedWallet,
    error: extensionError,
    isWalletConnected: extensionError !== 'NO_EXTENSION' && !!selectedWallet && !isConnectingWallet,
    isConnectingWallet,
  }

  if (extensionError || !selectedWallet?.extension) {
    value.isLoading = false
  }

  return <AccountsContext.Provider value={value}>{props.children}</AccountsContext.Provider>
}
