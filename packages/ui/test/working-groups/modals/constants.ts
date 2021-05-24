import { Worker } from '@/working-groups/types'

import { alice } from '../../_mocks/keyring'

export const WORKER: Worker = {
  membership: {
    id: '1',
    controllerAccount: alice.address,
  },
  group: {
    name: 'forum',
    id: '1',
  },
  isLeader: false,
  rewardPerBlock: 100,
  earnedTotal: 2000,
  stake: 2000,
  status: '',
  id: '1',
}
