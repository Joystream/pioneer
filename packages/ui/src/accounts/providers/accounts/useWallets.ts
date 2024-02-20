import { InjectedWindow, Wallet } from 'injectweb3-connect'
import { groupBy } from 'lodash'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Subject, firstValueFrom } from 'rxjs'

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

const genesisHash$ = new Subject<string>()
const WalletDisconnection$ = new Subject<void>()

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
  useEffect(() => {
    if (api) genesisHash$.next(api.genesisHash.toHex())
  }, [api?.isConnected])

  const walletConnect = useMemo(() => {
    const wcProjectId: string | undefined = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID
    if (!wcProjectId) return

    const genesisHash = firstValueFrom(genesisHash$)
    return new WalletConnect(wcProjectId, genesisHash, WalletDisconnection$, () => setWallet(undefined))
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

  const { wallet, setWallet, walletState } = useSelectedWallet(allWallets)

  return { allWallets, wallet, setWallet, walletState }
}

const useSelectedWallet = (allWallets: Wallet[]) => {
  const [wallet, _setWallet] = useState<Wallet>()
  const [recentWallet, setRecentWallet] = useLocalStorage<string | undefined>('recentWallet')
  const [walletState, setWalletState] = useState<WalletState>()

  const setWallet = useCallback(async (wallet: Wallet | undefined) => {
    if (!wallet) {
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
      return () => WalletDisconnection$.next()
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
