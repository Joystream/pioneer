import { KeyringInstance } from '@polkadot/keyring/types'
import { KeyringStruct } from '@polkadot/ui-keyring/types'

import { Address } from '../../common/types'

export function isValidAddress(address: Address, keyring: KeyringInstance | KeyringStruct) {
  try {
    keyring.encodeAddress(keyring.decodeAddress(address))
  } catch (e) {
    return false
  }
  return true
}
