import { BN_TWO } from '@polkadot/util'
import BN from 'bn.js'

import { WorkerWithDetails } from '@/working-groups/types'

import { alice } from '../keyring'

export const WORKER: WorkerWithDetails = {
  membership: {
    id: '1',
    controllerAccount: alice.address,
  },
  group: {
    name: 'forum',
    id: 'forumWorkingGroup',
  },
  isLead: false,
  rewardPerBlock: BN_TWO,
  stake: new BN(2000),
  minStake: new BN(2000),
  owedReward: new BN(1000),
  status: 'WorkerStatusActive',
  id: '1',
  runtimeId: 12,
  applicationId: '1',
  openingId: '1',
  roleAccount: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
  stakeAccount: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
  rewardAccount: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
  hiredAtBlock: {
    network: 'OLYMPIA',
    number: 100,
    timestamp: '2021-06-01T06:42:00.155Z',
  },
}
