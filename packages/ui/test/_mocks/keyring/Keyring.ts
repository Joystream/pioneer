import { createTestKeyring } from '@polkadot/keyring/testing'
import { accountKey } from '@polkadot/ui-keyring/defaults'
import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { genericSubject } from '@polkadot/ui-keyring/observable/genericSubject'
import { BrowserStore } from '@polkadot/ui-keyring/stores'

export const mockKeyring = () => {
  const keyring = createTestKeyring()
  const accountsSubject = genericSubject(accountKey)
  const store = new BrowserStore()

  keyring.getPairs().map((pair) => {
    accountsSubject.add(store, pair.address, pair.toJson())
  })

  return {
    keyring: keyring,
    loadAll: () => undefined,
    getPair: (address: string) => keyring.getPair(address),
    decodeAddress: (address: string) => keyring.decodeAddress(address),
    encodeAddress: (address: string) => keyring.encodeAddress(address),
    accounts: accountsSubject,
  } as unknown as Keyring
}
