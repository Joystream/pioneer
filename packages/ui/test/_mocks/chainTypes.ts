import { createType } from '@joystream/types'
import { DeriveBalancesAll } from '@polkadot/api-derive/types'
import { TypeRegistry } from '@polkadot/types'
import BN from 'bn.js'

const typeRegistry = new TypeRegistry()

export const createBalanceOf = (balance: number) => typeRegistry.createType('BalanceOf', balance)

export const createRuntimeDispatchInfo = (fee: number) =>
  typeRegistry.createType('RuntimeDispatchInfo', {
    weight: 0,
    partialFee: fee,
  })

export const createBalance = (value: number) => {
  return createType('Balance', new BN(value))
}

export const creteLockIdentifier = (type: number) =>
  createType('LockIdentifier', new Uint8Array(new Array(8).fill(type)))

export const createBalanceLock = (amount: number, type = 9) =>
  createType('BalanceLock', {
    id: creteLockIdentifier(type),
    amount: createBalance(amount),
    reasons: createType('Reasons', 'all'),
  })

export const EMPTY_BALANCES: DeriveBalancesAll = {
  additional: [],
  accountId: createType('AccountId', '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'),
  accountNonce: createType('Index', 1),
  availableBalance: createBalance(0),
  freeBalance: createBalance(0),
  frozenFee: createBalance(0),
  frozenMisc: createBalance(0),
  isVesting: false,
  lockedBalance: createBalance(0),
  lockedBreakdown: [],
  reservedBalance: createBalance(0),
  vestedBalance: createBalance(0),
  vestedClaimable: createBalance(0),
  vestingEndBlock: createType('BlockNumber', 1234),
  vestingLocked: createBalance(0),
  vestingPerBlock: createBalance(0),
  vestingTotal: createBalance(0),
  votingBalance: createBalance(0),
}
