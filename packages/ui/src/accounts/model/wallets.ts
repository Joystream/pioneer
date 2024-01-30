import { BaseDotsamaWallet, InjectedWindow, SubwalletLogo, TalismanLogo, Wallet } from 'injectweb3-connect'

export { PolkadotLogo as DefaultWalletIcon } from 'injectweb3-connect'

export function getAllWallets() {
  const unknownWallets = Object.keys((window as Window & InjectedWindow)?.injectedWeb3 ?? {})
    .filter((name) => !recommendedWalletsNames.includes(name))
    .map((wallet) => new BaseDotsamaWallet({ extensionName: wallet }))

  return [...recommendedWallets, ...unknownWallets]
}

export function getWalletBySource(source: string): Wallet | undefined {
  return (
    recommendedWallets.find((wallet) => wallet.extensionName === source) ??
    new BaseDotsamaWallet({ extensionName: source })
  )
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
].map((data) => new BaseDotsamaWallet(data))
const recommendedWalletsNames = recommendedWallets.map((wallet) => wallet.extensionName)
