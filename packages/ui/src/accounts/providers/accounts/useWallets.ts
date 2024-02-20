import { InjectedWindow, Wallet } from 'injectweb3-connect'
import { groupBy } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { Subject } from 'rxjs'

import { WalletConnect } from '@/accounts/model/walletConnect'
import { RecommendedWallets, RecommendedWalletsNames, asWallet } from '@/accounts/model/wallets'
import { useApi } from '@/api/hooks/useApi'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'

type WalletState = undefined | 'ENABLING' | 'READY' | 'APP_REJECTED'

export type UseWallets = {
  allWallets: Wallet[]
  wallet?: Wallet
  setWallet?: (wallet: Wallet | undefined) => void
  walletState?: WalletState
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

  const { wallet, setWallet, state } = useSelectedWallet(allWallets)

  return { allWallets, wallet, setWallet, walletState: state }
}

const useSelectedWallet = (allWallets: Wallet[]) => {
  const [wallet, setWallet] = useState<Wallet>()
  const [selectedWallet, setSelectedWallet] = useState<Wallet>()
  const [recentWallet, setRecentWallet] = useLocalStorage<string | undefined>('recentWallet')
  const [appRejected, setAppRejected] = useState<boolean>(false)

  useEffect(() => {
    if (!selectedWallet) {
      setRecentWallet(undefined)
      setWallet(undefined)
      return
    }

    setAppRejected(false)
    enableWallet(selectedWallet)
      .then(() => {
        setRecentWallet(selectedWallet.extensionName)
        setWallet(selectedWallet)
      })
      .catch((error: Error) => {
        setSelectedWallet(undefined)

        if (error?.message.includes('not allowed to interact') || error?.message.includes('Rejected')) {
          setAppRejected(true)
        }
      })

    return () => WalletDisconnection.next()
  }, [selectedWallet])

  useEffect(() => {
    const cachedWallet = recentWallet && allWallets.find((wallet) => wallet.extensionName === recentWallet)
    if (cachedWallet) setSelectedWallet(cachedWallet)
  }, [allWallets])

  return {
    wallet,
    setWallet: setSelectedWallet,
    state: walletState(appRejected, selectedWallet, wallet),
  }
}

async function enableWallet(wallet: Wallet) {
  await wallet.enable('Pioneer')
}

function walletState(
  appRejected: boolean,
  selectedWallet: Wallet | undefined,
  wallet: Wallet | undefined
): WalletState {
  if (wallet) return 'READY'
  if (appRejected) return 'APP_REJECTED'
  if (selectedWallet) return 'ENABLING'
}
