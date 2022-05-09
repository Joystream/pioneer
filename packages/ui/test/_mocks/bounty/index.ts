import BN from 'bn.js'

import { Bounty, WorkEntry } from '@/bounty/types/Bounty'

import { getMember } from '../members'

export const baseBounty: Bounty = {
  id: '1',
  createdAt: '2021-12-31',
  isTerminated: false,
  description: 'Description',
  stage: 'successful',
  imageUri: '',
  inBlock: 12,
  title: 'Title',
  cherry: new BN(1010),
  entrantStake: new BN(10000),
  creator: getMember('alice'),
  oracle: getMember('bob'),
  fundingType: {
    minAmount: new BN(10000),
    maxAmount: new BN(12000),
    maxPeriod: 2000,
  },
  workPeriod: 1000,
  judgingPeriod: 1000,
  totalFunding: new BN(2000),
  contributors: [],
  entrantWhitelist: undefined,
  entries: [],
  discussionThreadId: '1',
}

export const baseEntry: WorkEntry = {
  worker: getMember('alice'),
  status: 'BountyEntryStatusWithdrawn',
  winner: true,
  hasSubmitted: true,
  passed: false,
  id: '1',
  bountyId: '0',
  stake: new BN(10),
  rejected: false,
  withdrawn: false,
  hasCashedOut: true,
}
