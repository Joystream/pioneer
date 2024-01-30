import {
  BaseDotsamaWallet,
  InjectedWindow,
  PolkadotLogo,
  SubwalletLogo,
  TalismanLogo,
  Wallet,
} from 'injectweb3-connect'

export function getAllWallets() {
  const unknownWallets = Object.keys((window as Window & InjectedWindow)?.injectedWeb3 ?? {})
    .filter((name) => !supportedWalletsNames.includes(name))
    .map((wallet) => new BaseDotsamaWallet({ extensionName: wallet }))

  return [...supportedWallets, ...unknownWallets]
}

export function getWalletBySource(source: string): Wallet | undefined {
  const supportedWallet = supportedWallets.find((wallet) => {
    return wallet.extensionName === source
  })
  return supportedWallet ?? new BaseDotsamaWallet({ extensionName: source })
}

const supportedWallets = [
  {
    extensionName: 'polkadot-js',
    title: 'Polkadot.js',
    noExtensionMessage: 'You can use any Polkadot compatible wallet but we recommend using Talisman',
    installUrl:
      'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd/related',
    logo: {
      src: PolkadotLogo,
      alt: 'Polkadotjs Logo',
    },
  },
  {
    extensionName: 'subwallet-js',
    title: 'SubWallet',
    noExtensionMessage: 'You can use any Polkadot compatible wallet but we recommend using Talisman',
    installUrl: 'https://chrome.google.com/webstore/detail/subwallet/onhogfjeacnfoofkfgppdlbmlmnplgbn?hl=en&authuser=0',
    logo: {
      src: SubwalletLogo as any,
      alt: 'Subwallet Logo',
    },
  },
  {
    extensionName: 'talisman',
    title: 'Talisman',
    noExtensionMessage: 'You can use any Polkadot compatible wallet but we recommend using Talisman',
    installUrl: 'https://app.talisman.xyz/spiritkeys',
    logo: {
      src: TalismanLogo as any,
      alt: 'Talisman Logo',
    },
  },
].map((data) => new BaseDotsamaWallet(data))
const supportedWalletsNames = supportedWallets.map((wallet) => wallet.extensionName)
