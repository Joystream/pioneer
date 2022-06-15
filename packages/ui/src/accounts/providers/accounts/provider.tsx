import { web3Accounts, web3AccountsSubscribe } from '@polkadot/extension-dapp'
import { documentReadyPromise } from '@polkadot/extension-dapp/util'
import {
  Injected,
  InjectedWindowProvider,
  InjectedExtensionInfo,
  InjectedAccount,
  InjectedExtension,
} from '@polkadot/extension-inject/types'
import { Keyring } from '@polkadot/ui-keyring'
import React, { ReactNode, useEffect, useState } from 'react'
import { debounceTime, filter, skip } from 'rxjs/operators'

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

type InjectedExtensionRaw = Record<string, InjectedWindowProvider>

function getWindowExtension(
  originName: string,
  extensionName: string
): Promise<[InjectedExtensionInfo, Injected | void]> {
  const injectedExtensions = Object.entries((window as any).injectedWeb3 as InjectedExtensionRaw)

  const [name, { version, enable }] =
    injectedExtensions.find(([name]) => name === extensionName) ?? injectedExtensions[0]

  return Promise.all([
    { name, version },
    // eslint-disable-next-line no-console
    enable(originName).catch((error): void => console.error(`Error initializing ${extensionName}: ${error.message}`)),
  ])
}

const enableSingleExtension = ([info, extension]: [
  InjectedExtensionInfo,
  Injected | void
]): Promise<InjectedExtension> => {
  return documentReadyPromise((): Promise<InjectedExtension> => {
    if (extension) {
      extension.accounts.subscribe = (cb: (accounts: InjectedAccount[]) => void | Promise<void>) => {
        // eslint-disable-next-line no-console
        extension.accounts.get().then(cb).catch(console.error)

        return () => {
          // no need for unsub
        }
      }
    }

    return Promise.resolve({
      ...info,
      ...extension,
    } as InjectedExtension)
  })
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

  await enableSingleExtension(extension)

  const injectedAccounts = await web3Accounts()

  if (!isKeyringLoaded(keyring)) {
    keyring.loadAll({ isDevelopment: false }, injectedAccounts)
  }

  await web3AccountsSubscribe((accounts) => {
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
