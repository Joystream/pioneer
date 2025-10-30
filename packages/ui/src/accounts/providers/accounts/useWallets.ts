import { InjectedWindow, Wallet } from 'injectweb3-connect'
import { groupBy } from 'lodash'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Subject, firstValueFrom } from 'rxjs'

import { Metamask } from '@/accounts/model/metamask'
import { WalletConnect } from '@/accounts/model/walletConnect'
import { RecommendedWallets, RecommendedWalletsNames, asWallet } from '@/accounts/model/wallets'
import { useApi } from '@/api/hooks/useApi'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'

type WalletState = undefined | 'ENABLING' | 'READY' | 'APP_REJECTED'

export type UseWallets = {
  allWallets: Wallet[]
  wallet?: Wallet
  setWallet?: (wallet: Wallet | undefined) => void
  walletState?: WalletState
}

const genesisHash$ = new Subject<string>()
const WalletDisconnection$ = new Subject<void>()

export const useWallets = (): UseWallets => {
  const walletExtensions = useWalletExtensions()
  const walletConnect = useWalletConnect(() => setWallet(undefined))
  const metamask = useMetamask()

  const allWallets: Wallet[] = useMemo(
    () => [
      ...walletExtensions.installed,
      ...walletExtensions.unknown,
      ...metamask,
      ...walletConnect,
      ...walletExtensions.recommended,
    ],
    [walletExtensions, walletConnect]
  )

  const { wallet, setWallet, walletState } = useSelectedWallet(allWallets)

  return { allWallets, wallet, setWallet, walletState }
}

const useWalletExtensions = (): { installed: Wallet[]; recommended: Wallet[]; unknown: Wallet[] } => {
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

  return useMemo(() => {
    const unknown = installedWalletsNames.filter((name) => !RecommendedWalletsNames.includes(name)).map(asWallet)
    const { installed = [], recommended = [] } = groupBy(RecommendedWallets, (wallet) =>
      installedWalletsNames.includes(wallet.extensionName) ? 'installed' : 'recommended'
    )
    return { installed, recommended, unknown }
  }, [installedWalletsNames])
}

const useWalletConnect = (disconnect: () => void): WalletConnect[] => {
  const { api } = useApi()
  useEffect(() => {
    if (api) genesisHash$.next(api.genesisHash.toHex())
  }, [api?.isConnected])

  const walletConnect: WalletConnect | undefined = useMemo(() => {
    const wcProjectId: string | undefined = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID
    if (!wcProjectId) return

    const genesisHash = firstValueFrom(genesisHash$)
    return new WalletConnect(wcProjectId, genesisHash, WalletDisconnection$, disconnect)
  }, [])

  return useMemo(() => (walletConnect ? [walletConnect] : []), [walletConnect])
}

const useMetamask = (): Metamask[] => {
  const [endpoints] = useNetworkEndpoints()

  const metamask: Metamask | undefined = useMemo(() => {
    const snapId = process.env.REACT_APP_METAMASK_SNAP_ID
    const isMetaMask = !!window.ethereum && '_metamask' in window.ethereum
    if (!snapId || !isMetaMask) return

    return new Metamask(snapId, endpoints.nodeHttpRpcEndpoint)
  }, [endpoints.nodeHttpRpcEndpoint])

  return useMemo(() => (metamask ? [metamask] : []), [metamask])
}

const useSelectedWallet = (allWallets: Wallet[]) => {
  const [wallet, _setWallet] = useState<Wallet>()
  const [recentWallet, setRecentWallet] = useLocalStorage<string | undefined>('recentWallet')
  const [walletState, setWalletState] = useState<WalletState>()

  const setWallet = useCallback(async (wallet: Wallet | undefined): Promise<void> => {
    if (!wallet) {
      WalletDisconnection$.next()
      _setWallet(undefined)
      setWalletState(undefined)
      setRecentWallet(undefined)
      return
    }

    setWalletState('ENABLING')
    try {
      await wallet.enable('Pioneer')
      _setWallet(wallet)
      setWalletState('READY')
      setRecentWallet(wallet.extensionName)
      return
    } catch (error) {
      const message: string = error?.message?.toLowerCase()
      if (message.includes('not allowed to interact') || message.includes('rejected')) {
        return setWalletState('APP_REJECTED')
      }
      setWalletState(undefined)
    }
  }, [])

  const initialRecentWallet = useRef(recentWallet)
  const cachedWallet = initialRecentWallet.current
    ? allWallets.find((wallet) => wallet.extensionName === initialRecentWallet.current)
    : undefined

  useEffect(() => {
    if (cachedWallet) setWallet(cachedWallet)
  }, [cachedWallet?.extensionName])

  return { wallet, setWallet, walletState }
}
