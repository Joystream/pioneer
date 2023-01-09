import { BN_TEN, BN_TWO, BN_ZERO } from '@polkadot/util'
import BN from 'bn.js'

type BNParam = number | string | number[] | Uint8Array | Buffer | BN

export const sumStakes = (entities: { stake: BNParam }[]) =>
  entities.reduce((total, { stake }) => total.add(new BN(stake)), BN_ZERO)

export const asBN = (value: any) => new BN(String(value))

export const sumBN = (a: BN | undefined, b: BN | undefined): BN => new BN(a ?? 0).add(new BN(b ?? 0))

export const powerOf10 = (value: any) => BN_TEN.pow(asBN(value))

export const powerOf2 = (value: any) => BN_TWO.pow(asBN(value))
