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
  roleAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  stakeAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  rewardAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  hiredAtBlock: {
    network: 'OLYMPIA',
    number: 100,
    timestamp: '2021-06-01T06:42:00.155Z',
  },
}
