import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { Keyring } from '@polkadot/ui-keyring'
import { getWalletBySource, Wallet } from 'injectweb3-connect'
import React, { ReactNode, useEffect, useState } from 'react'
import { debounceTime, filter, skip } from 'rxjs/operators'

import { useKeyring } from '@/common/hooks/useKeyring'
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
const onExtensionLoaded = (onSuccess: (selectedExtension?: string) => void, onFail: () => void) => () => {
  const interval = 20
  const timeout = 1000
  let timeElapsed = 0

  const intervalId = setInterval(() => {
    const extensionsKeys = Object.keys((window as any)?.injectedWeb3 ?? {})
    if (extensionsKeys.length) {
      clearInterval(intervalId)
      onSuccess(undefined)
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

  useEffect(
    onExtensionLoaded(
      (possibleExtension) => {
        setIsExtensionLoaded(true)

        if (possibleExtension) {
          const possibleWallet = getWalletBySource(possibleExtension)
          setSelectedWallet(possibleWallet)
        }
      },
      () => setExtensionError('NO_EXTENSION')
    ),
    []
  )

  useEffect(() => {
    if (!isExtensionLoaded || !selectedWallet) {
      return
    }

    setExtensionError(undefined)
    loadKeysFromExtension(keyring, selectedWallet).catch((error: Error) => {
      setSelectedWallet(undefined)

      if (error?.message.includes('not allowed to interact') || error?.message.includes('Rejected')) {
        setExtensionError('APP_REJECTED')
      }
    })
  }, [isExtensionLoaded, selectedWallet])

  const accounts = useObservable(
    keyring.accounts.subject.asObservable().pipe(
      debounceTime(20),
      filter((accounts) => !!accounts),
      skip(1)
    ),
    [keyring]
  )
  const allAccounts: Account[] = []

  if (accounts) {
    allAccounts.push(
      ...Object.values(accounts).map((account) => ({
        address: account.json.address,
        name: account.json.meta.name,
        source: account.json.meta.source as string,
      }))
    )
  }

  const hasAccounts = allAccounts.length !== 0

  const value: UseAccounts = {
    allAccounts,
    hasAccounts,
    isLoading: !isExtensionLoaded || !accounts,
    setWallet: setSelectedWallet,
    wallet: selectedWallet,
    error: extensionError,
  }

  if (extensionError || !selectedWallet?.extension) {
    value.isLoading = false
  }

  return <AccountsContext.Provider value={value}>{props.children}</AccountsContext.Provider>
}
