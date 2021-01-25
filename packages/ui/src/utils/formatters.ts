import BN from 'bn.js'
import { formatBalance } from '@polkadot/util'

const decimals = 12

export const formatTokenValue = (value: BN | number) => {
  return formatBalance(new BN(value), {
    decimals: decimals,
    withUnit: 'JOY',
  })
}
