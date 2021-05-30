import BN from 'bn.js'

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
  reward: {
    value: new BN(1000),
    interval: 14410,
  },
  earnedTotal: 2000,
  stake: 2000,
  status: '',
  id: '1',
}
