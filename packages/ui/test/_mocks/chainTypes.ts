import { createType } from '@joystream/types'
import { DeriveBalancesAll } from '@polkadot/api-derive/types'
import { TypeRegistry } from '@polkadot/types'
import BN from 'bn.js'

import { LockType } from '@/accounts/types'

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

const LOCK_TYPE_TO_ID: Record<LockType, number> = {
  Staking: 0, //This is wrong, but for test it might be OK
  Voting: 0,
  'Council Candidate': 1,
  Councilor: 2,
  Validation: 3,
  Nomination: 4,
  Proposals: 5,
  'Storage Worker': 6,
  'Content Directory Worker': 7,
  'Forum Worker': 8,
  'Membership Worker': 9,
  Invitation: 10,
  'Staking Candidate': 11,
  Bounties: 12,
  'Gateway Worker': 13,
  'Operations Worker': 14,
} as const

export const creteLockIdentifier = (type: LockType) =>
  createType('LockIdentifier', new Uint8Array(new Array(8).fill(LOCK_TYPE_TO_ID[type])))

export const createBalanceLock = (amount: number, type: LockType = 'Staking Candidate') =>
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
