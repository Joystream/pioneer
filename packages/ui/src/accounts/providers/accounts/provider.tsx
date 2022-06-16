import { Keyring } from '@polkadot/ui-keyring'
import React, { ReactNode, useEffect, useState } from 'react'
import { debounceTime, filter, skip } from 'rxjs/operators'

import {
  enableSingleExtension,
  getAccountsFromExtensions,
  getWindowExtension,
  web3AccountsSubscribe,
} from '@/accounts/providers/accounts/helpers'
import { useKeyring } from '@/common/hooks/useKeyring'
import { useObservable } from '@/common/hooks/useObservable'
import { error } from '@/common/logger'
import { SelectWalletModal } from '@/common/modals/SelectWalletModal/SelectWalletModal'

import { Account } from '../../types'

import { AccountsContext } from './context'

type Error = 'EXTENSION'

export interface UseAccounts {
  allAccounts: Account[]
  hasAccounts: boolean
  isLoading: boolean
  error?: Error
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

const loadKeysFromExtension = async (
  keyring: Keyring,
  selectedExtension: string,
  onInitializationFailure: () => void
) => {
  const extension = await getWindowExtension('Pioneer', selectedExtension)
  if (!extension[1]) {
    return onInitializationFailure()
  }

  const enabledExtension = await enableSingleExtension(extension)

  const injectedAccounts = await getAccountsFromExtensions([enabledExtension])

  if (!isKeyringLoaded(keyring)) {
    keyring.loadAll({ isDevelopment: false }, injectedAccounts)
  }

  await web3AccountsSubscribe(enabledExtension, (accounts) => {
    const current = keyring.getAccounts()

    const addresses = accounts.map(({ address }) => address)

    current.forEach(({ address }) => {
      if (!addresses.includes(address)) {
        keyring.forgetAccount(address)
      }
    })

    accounts.forEach((injected) => keyring.addExternal(injected.address, injected.meta))
  })
}

// Extensions is not always ready on application load, hence the check
const onExtensionLoaded = (onSuccess: (selectedExtension?: string) => void, onFail: () => void) => () => {
  const interval = 20
  const timeout = 1000
  let timeElapsed = 0

  const intervalId = setInterval(() => {
    const extensionsKeys = Object.keys((window as any).injectedWeb3)
    if (extensionsKeys.length) {
      clearInterval(intervalId)
      onSuccess(extensionsKeys.length === 1 ? extensionsKeys[0] : undefined)
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
  const [extensionUnavailable, setExtensionUnavailable] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<string | undefined>(undefined)
  const [failedWallet, setFailedWallet] = useState<string[]>([])

  useEffect(
    onExtensionLoaded(
      (possibleExtension) => {
        setIsExtensionLoaded(true)
        setSelectedWallet(possibleExtension)
      },
      () => setExtensionUnavailable(true)
    ),
    []
  )

  useEffect(() => {
    if (!isExtensionLoaded || !selectedWallet) {
      return
    }

    loadKeysFromExtension(keyring, selectedWallet, () => {
      setFailedWallet((prev) => [...prev, selectedWallet])
      setSelectedWallet(undefined)
    }).catch(error)
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
      }))
    )
  }

  const hasAccounts = allAccounts.length !== 0

  const value: UseAccounts = { allAccounts, hasAccounts, isLoading: !isExtensionLoaded || !accounts }

  if (extensionUnavailable) {
    value.error = 'EXTENSION'
    value.isLoading = false
  }

  return (
    <AccountsContext.Provider value={value}>
      {!selectedWallet && isExtensionLoaded && (
        <SelectWalletModal
          availableWallets={Object.keys((window as any).injectedWeb3).filter(
            (wallet) => !failedWallet.includes(wallet)
          )}
          onWalletSelect={(wallet) => setSelectedWallet(wallet)}
        />
      )}
      {props.children}
    </AccountsContext.Provider>
  )
}
