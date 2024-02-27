import { BaseDotsamaWallet, PolkadotLogo, SubwalletLogo, TalismanLogo, Wallet } from 'injectweb3-connect'

export const DefaultWalletIcon = PolkadotLogo

export const RecommendedWallets: Wallet[] = [
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
].map((data) => new BaseDotsamaWallet(data))

export const RecommendedWalletsNames = RecommendedWallets.map((wallet) => wallet.extensionName)

export const asWallet = (source: string): Wallet =>
  new BaseDotsamaWallet({ extensionName: source, logo: walletLogos.get(source) })

export const walletLogos = new Map([['polkadot-js', { src: DefaultWalletIcon, alt: 'Polkadotjs Logo' }]])
