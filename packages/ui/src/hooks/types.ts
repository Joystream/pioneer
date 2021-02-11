import BN from 'bn.js'

export type Address = string

export interface Account {
  name: string | undefined
  address: Address
}

export interface Balances {
  total: BN
  locked: BN
  recoverable: BN
  transferable: BN
}
