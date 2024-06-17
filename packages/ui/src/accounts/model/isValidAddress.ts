import { encodeAddress, decodeAddress } from '@polkadot/util-crypto'

import { Address } from '../../common/types'

export function isValidAddress(address: Address) {
  try {
    encodeAddress(decodeAddress(address))
  } catch (e) {
    return false
  }
  return true
}
