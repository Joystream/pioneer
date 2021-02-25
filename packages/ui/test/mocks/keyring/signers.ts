import { Keyring } from '@polkadot/keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'

export async function aliceSigner() {
  await cryptoWaitReady()
  const keyring = new Keyring({ type: 'sr25519' })

  return keyring.addFromUri('//Alice')
}

export async function bobSigner() {
  await cryptoWaitReady()
  const keyring = new Keyring({ type: 'sr25519' })

  return keyring.addFromUri('//Bob')
}
