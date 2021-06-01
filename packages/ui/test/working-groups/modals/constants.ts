import { getReward } from '@/working-groups/model/getReward'
import { WorkerWithDetails } from '@/working-groups/types'

import { alice } from '../../_mocks/keyring'

export const WORKER: WorkerWithDetails = {
  membership: {
    id: '1',
    controllerAccount: alice.address,
  },
  group: {
    name: 'forum',
    id: '1',
  },
  isLeader: false,
  reward: getReward(2, 'forum'),
  earnedTotal: 2000,
  stake: 2000,
  status: '',
  id: '1',
  applicationId: '1',
  openingId: '1',
  roleAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  stakeAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  rewardAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  hiredAtBlock: {
    id: '100',
    network: 'OLYMPIA',
    number: 100,
    timestamp: '2021-06-01T06:42:00.155Z',
  },
  unstakingPeriod: 14400,
}
