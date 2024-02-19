import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { Keyring } from '@polkadot/ui-keyring'
import { InjectedWindow, Wallet } from 'injectweb3-connect'
import { groupBy } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { Subject } from 'rxjs'

import { WalletConnect } from '@/accounts/model/walletConnect'
import { RecommendedWallets, RecommendedWalletsNames, asWallet } from '@/accounts/model/wallets'
import { useApi } from '@/api/hooks/useApi'
import { useKeyring } from '@/common/hooks/useKeyring'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'

type ExtensionError = 'NO_EXTENSION' | 'APP_REJECTED'

export type UseWallets = {
  allWallets: Wallet[]
  wallet?: Wallet
  setWallet?: (wallet: Wallet | undefined) => void
  error?: ExtensionError
}

const WalletDisconnection = new Subject<void>()

export const useWallets = (): UseWallets => {
  const [installedWalletsNames, setInstalledWalletsNames] = useState<string[]>([])

  useEffect(() => {
    const interval = 100
    const timeout = 2000
    const start = Date.now()

    const intervalId = setInterval(() => {
      const extensionsKeys = Object.keys((window as Window & InjectedWindow)?.injectedWeb3 ?? {})
      if (extensionsKeys.length !== installedWalletsNames.length) {
        setInstalledWalletsNames(extensionsKeys)
      }

      const timeElapsed = Date.now() - start
      if (timeElapsed > timeout) {
        clearTimeout(intervalId)
      }
    }, interval)

    return () => clearInterval(intervalId)
  }, [])

  const walletExtensions = useMemo(() => {
    const unknown = installedWalletsNames.filter((name) => !RecommendedWalletsNames.includes(name)).map(asWallet)
    const { installed = [], recommended = [] } = groupBy(RecommendedWallets, (wallet) =>
      installedWalletsNames.includes(wallet.extensionName) ? 'installed' : 'recommended'
    )
    return { installed, recommended, unknown }
  }, [installedWalletsNames])

  const { api } = useApi()
  const walletConnect = useMemo(() => {
    const genesisHash = api?.genesisHash.toHex()
    const wcProjectId: string | undefined = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID
    if (genesisHash && wcProjectId) {
      return new WalletConnect(wcProjectId, genesisHash, WalletDisconnection, () => setWallet(undefined))
    }
  }, [api?.isConnected])

  const allWallets = useMemo(
    () => [
      ...walletExtensions.installed,
      ...walletExtensions.unknown,
      ...(walletConnect ? [walletConnect] : []),
      ...walletExtensions.recommended,
    ],
    [walletExtensions, walletConnect]
  )

  const { wallet, setWallet, error } = useSelectedWallet(allWallets)

  return { allWallets, wallet, setWallet, error }
}

const useSelectedWallet = (allWallets: Wallet[]) => {
  const keyring = useKeyring()
  const [selectedWallet, setSelectedWallet] = useState<Wallet>()
  const [recentWallet, setRecentWallet] = useLocalStorage<string | undefined>('recentWallet')

  const setWallet = (wallet: Wallet | undefined) => {
    setSelectedWallet(wallet)
    if (!wallet) setRecentWallet(undefined)
  }

  useEffect(() => {
    if (!selectedWallet) return

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

    return () => WalletDisconnection.next()
  }, [selectedWallet])

  const [extensionError, setExtensionError] = useState<ExtensionError>()

  useEffect(() => {
    const cachedWallet = recentWallet && allWallets.find((wallet) => wallet.extensionName === recentWallet)
    if (cachedWallet) setSelectedWallet(cachedWallet)
  }, [allWallets])

  return {
    wallet: selectedWallet,
    setWallet,
    error: extensionError,
  }
}

async function loadKeysFromExtension(keyring: Keyring, wallet: Wallet) {
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

function isKeyringLoaded(keyring: Keyring) {
  try {
    return !!keyring.keyring
  } catch {
    return false
  }
}
