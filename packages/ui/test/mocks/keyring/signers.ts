import { KeyringPair } from '@polkadot/keyring/types'
import { Keyring } from '@polkadot/keyring'

export function aliceSigner(): KeyringPair {
  const keyring = new Keyring({ type: 'sr25519' })

  return keyring.addFromUri('//Alice')
}
