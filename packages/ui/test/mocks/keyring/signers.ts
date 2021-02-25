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
