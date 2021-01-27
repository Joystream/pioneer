import BN from 'bn.js'
import { formatBalance } from '@polkadot/util'

export const formatTokenValue = (value: BN | number | undefined) => {
  return formatBalance(new BN(value || 0), {
    withUnit: false,
  })
}
