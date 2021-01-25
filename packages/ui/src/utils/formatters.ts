import BN from 'bn.js'
import { BN_TEN, formatBalance } from '@polkadot/util'

const decimals = 12

export const formatTokenValue = (value: BN | number) => {
  return formatBalance(new BN(value), {
    decimals: decimals,
    withUnit: 'JOY',
  })
}

const pow = BN_TEN.pow(new BN(decimals))

export const toChainTokenValue = (number: number) => new BN(number).mul(pow)
