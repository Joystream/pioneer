import BN from 'bn.js'
import { formatBalance } from '@polkadot/util'

export const formatTokenValue = (value: BN | number) => {
  return formatBalance(new BN(value), {
    withUnit: 'JOY',
  })
}
