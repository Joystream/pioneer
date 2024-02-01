import { InjectedWindow, PolkadotLogo, SubwalletLogo, TalismanLogo } from 'injectweb3-connect'
import { groupBy } from 'lodash'
import { useEffect, useMemo, useState } from 'react'

import { WalletConnect } from '@/accounts/model/walletConnect'
import { PioneerWallet } from '@/accounts/model/wallets'
import { Wallet } from '@/accounts/types/wallet'
import { useApi } from '@/api/hooks/useApi'

const recommendedWallets = [
  {
    extensionName: 'talisman',
    title: 'Talisman',
    noExtensionMessage: 'You can use any Polkadot compatible wallet but we recommend using Talisman',
    installUrl: 'https://talisman.xyz/download',
    logo: { src: TalismanLogo, alt: 'Talisman Logo' },
  },
  {
    extensionName: 'subwallet-js',
    title: 'SubWallet',
    noExtensionMessage: 'You can use any Polkadot compatible wallet but we recommend using Talisman',
    installUrl: 'https://www.subwallet.app/download.html',
    logo: { src: SubwalletLogo, alt: 'Subwallet Logo' },
  },
].map((data) => new PioneerWallet(data))

const recommendedWalletsNames = recommendedWallets.map((wallet) => wallet.extensionName)

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
    const unknown = installedWalletsNames.filter((name) => !recommendedWalletsNames.includes(name)).map(asWallet)
    const { installed = [], recommended = [] } = groupBy(recommendedWallets, (wallet) =>
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

const asWallet = (source: string): Wallet => new PioneerWallet({ extensionName: source, logo: walletLogos.get(source) })

const walletLogos = new Map([['polkadot-js', { src: PolkadotLogo, alt: 'Polkadotjs Logo' }]])
