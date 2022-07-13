import BN from 'bn.js'

import { BN_ZERO } from '@/common/constants'

type BNParam = number | string | number[] | Uint8Array | Buffer | BN

export const sumStakes = (entities: { stake: BNParam }[]) =>
  entities.reduce((total, { stake }) => total.add(new BN(stake)), BN_ZERO)

export const asBN = (value: any) => new BN(String(value))
