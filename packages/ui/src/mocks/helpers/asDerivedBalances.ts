import { DeriveBalancesAll } from '@polkadot/api-derive/types'
import { BN_ZERO } from '@polkadot/util'
import BN from 'bn.js'

import { LockType } from '@/accounts/types'
import { createType } from '@/common/model/createType'

import { createBalanceLock } from '../../../test/_mocks/chainTypes'

type Balances = { available?: number; locked?: number; lockId?: LockType }

export const asDerivedBalances = ({ available, lockId, locked }: Balances) => {
  const availableBalance = new BN(available ?? 0)
  const lockedBalance = new BN(locked ?? 0)

  return {
    availableBalance: createType('Balance', availableBalance),
    lockedBalance: createType('Balance', lockedBalance),
    accountId: createType('AccountId', 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf'),
    accountNonce: createType('Index', 1),
    freeBalance: createType('Balance', availableBalance.add(lockedBalance)),
    frozenFee: new BN(0),
    frozenMisc: new BN(0),
    isVesting: false,
    lockedBreakdown: lockedBalance.eq(BN_ZERO) ? [] : [createBalanceLock(locked!, lockId ?? 'Bound Staking Account')],
    reservedBalance: new BN(0),
    vestedBalance: new BN(0),
    vestedClaimable: new BN(0),
    vestingEndBlock: createType('BlockNumber', 1234),
    vestingLocked: new BN(0),
    vestingPerBlock: new BN(0),
    vestingTotal: new BN(0),
    votingBalance: new BN(0),
    vesting: [],
  } as unknown as DeriveBalancesAll
}
