import testKeyring from '@polkadot/keyring/testing'
import { Keyring } from '@polkadot/ui-keyring/Keyring'

export const mockKeyring = () => {
  const keyring = testKeyring()

  return ({
    keyring: keyring,
    loadAll: () => undefined,
    getPair: (address: string) => keyring.getPair(address),
  } as unknown) as Keyring
}
