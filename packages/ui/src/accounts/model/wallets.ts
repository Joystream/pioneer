import { InjectedWindow, PolkadotLogo, SubwalletLogo, TalismanLogo } from 'injectweb3-connect'
import { groupBy } from 'lodash'

import { Wallet } from '../types/wallet'

import { PioneerWallet } from './PioneerWallet'

export const DefaultWalletIcon = PolkadotLogo

export function getAllWallets(): Wallet[] {
  const installedWalletsNames = Object.keys((window as Window & InjectedWindow)?.injectedWeb3 ?? {})
  const unknownWallets = installedWalletsNames.filter((name) => !recommendedWalletsNames.includes(name)).map(asWallet)
  const { installed = [], recommended = [] } = groupBy(recommendedWallets, (wallet) =>
    installedWalletsNames.includes(wallet.extensionName) ? 'installed' : 'recommended'
  )

  return [...installed, ...unknownWallets, ...recommended]
}

export function getWalletBySource(source: string): Wallet {
  return recommendedWallets.find((wallet) => wallet.extensionName === source) ?? asWallet(source)
}

function asWallet(source: string): Wallet {
  return new PioneerWallet({ extensionName: source, logo: walletLogos.get(source) })
}

const recommendedWallets = [
  {
    extensionName: 'talisman',
    title: 'Talisman',
    noExtensionMessage: 'You can use any Polkadot compatible wallet but we recommend using Talisman',
    installUrl: 'https://app.talisman.xyz',
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

const walletLogos = new Map([['polkadot-js', { src: PolkadotLogo, alt: 'Polkadotjs Logo' }]])
