import { Keyring } from '@polkadot/keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'

const getFromUri = async (uri: string) => {
  await cryptoWaitReady()
  const keyring = new Keyring({ type: 'sr25519' })

  return keyring.addFromUri(uri)
}

export const aliceSigner = async () => getFromUri('//Alice')
export const aliceStashSigner = async () => getFromUri('//Alice//stash')

export const bobSigner = async () => getFromUri('//Bob')
export const bobStashSigner = async () => getFromUri('//Bob//stash')

export const charlieSigner = async () => getFromUri('//Charlie')
export const daveSigner = async () => getFromUri('//Dave')
export const eveSigner = async () => getFromUri('//Eve')
export const ferdieSigner = async () => getFromUri('//Ferdie')

export const alice = {
  name: 'alice',
  address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
}
export const aliceStash = {
  name: 'alice_stash',
  address: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
}

export const bob = {
  name: 'bob',
  address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
}
export const bobStash = {
  name: 'bob_stash',
  address: '5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc',
}
