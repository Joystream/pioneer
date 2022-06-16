/* eslint-disable no-console */
import { documentReadyPromise } from '@polkadot/extension-dapp/util'
import {
  Injected,
  InjectedAccount,
  InjectedAccountWithMeta,
  InjectedExtension,
  InjectedExtensionInfo,
  InjectedWindowProvider,
  Unsubcall,
} from '@polkadot/extension-inject/types'
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto'

type InjectedExtensionRaw = Record<string, InjectedWindowProvider>

export function getWindowExtension(
  originName: string,
  extensionName: string
): Promise<[InjectedExtensionInfo, Injected | void]> {
  const injectedExtensions = Object.entries((window as any).injectedWeb3 as InjectedExtensionRaw)

  const [name, { version, enable }] =
    injectedExtensions.find(([name]) => name === extensionName) ?? injectedExtensions[0]

  return Promise.all([
    { name, version },
    enable(originName).catch((error): void => console.error(`Error initializing ${extensionName}: ${error.message}`)),
  ])
}

export const enableSingleExtension = ([info, extension]: [
  InjectedExtensionInfo,
  Injected | void
]): Promise<InjectedExtension> => {
  return documentReadyPromise((): Promise<InjectedExtension> => {
    if (extension) {
      extension.accounts.subscribe = (cb: (accounts: InjectedAccount[]) => void | Promise<void>) => {
        // eslint-disable-next-line no-console
        extension.accounts.get().then(cb).catch(console.error)

        return () => {
          // no need for unsub
        }
      }
    }

    return Promise.resolve({
      ...info,
      ...extension,
    } as InjectedExtension)
  })
}

export const getAccountsFromExtensions = (extensions: InjectedExtension[]) =>
  Promise.all(
    extensions.map(async (extension) => {
      try {
        const list = await extension.accounts.get()

        return mapAccounts(extension.name, list)
      } catch (e) {
        return []
      }
    })
  ).then((result) => result.flat())

export async function web3AccountsSubscribe(
  extension: InjectedExtension,
  cb: (accounts: InjectedAccountWithMeta[]) => void | Promise<void>
): Promise<Unsubcall> {
  const accounts: Record<string, InjectedAccount[]> = {}

  const triggerUpdate = (): void | Promise<void> =>
    cb(
      Object.entries(accounts).reduce(
        (result: InjectedAccountWithMeta[], [source, list]): InjectedAccountWithMeta[] => {
          result.push(...mapAccounts(source, list))

          return result
        },
        []
      )
    )

  const unsub = extension.accounts.subscribe((result) => {
    accounts[extension.name] = result

    try {
      // eslint-disable-next-line no-console
      triggerUpdate()?.catch(console.error)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  })

  return (): void => {
    unsub()
  }
}

function mapAccounts(source: string, list: InjectedAccount[], ss58Format?: number): InjectedAccountWithMeta[] {
  return list.map(
    ({ address, genesisHash, name, type }): InjectedAccountWithMeta => ({
      address: address.length === 42 ? address : encodeAddress(decodeAddress(address), ss58Format),
      meta: { genesisHash, name, source },
      type,
    })
  )
}
