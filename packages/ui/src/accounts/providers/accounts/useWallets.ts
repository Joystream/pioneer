import { InjectedWindow, Wallet } from 'injectweb3-connect'
import { groupBy } from 'lodash'
import { useEffect, useMemo, useState } from 'react'

import { WalletConnect } from '@/accounts/model/walletConnect'
import { RecommendedWallets, RecommendedWalletsNames, asWallet } from '@/accounts/model/wallets'
import { useApi } from '@/api/hooks/useApi'

export const useWallets = (): Wallet[] => {
  const { api } = useApi()

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

  const wallets = useMemo(() => {
    const unknown = installedWalletsNames.filter((name) => !RecommendedWalletsNames.includes(name)).map(asWallet)
    const { installed = [], recommended = [] } = groupBy(RecommendedWallets, (wallet) =>
      installedWalletsNames.includes(wallet.extensionName) ? 'installed' : 'recommended'
    )
    return { installed, recommended, unknown }
  }, [installedWalletsNames])

  const walletConnect = useMemo(() => {
    const genesisHash = api?.genesisHash.toHex()
    const wcProjectId: string | undefined = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID
    if (genesisHash && wcProjectId) {
      return new WalletConnect(wcProjectId, genesisHash)
    }
  }, [api?.isConnected])

  return useMemo(
    () => [...wallets.installed, ...wallets.unknown, ...(walletConnect ? [walletConnect] : []), ...wallets.recommended],
    [wallets, walletConnect]
  )
}
