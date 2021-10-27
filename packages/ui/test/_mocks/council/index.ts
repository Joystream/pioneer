import { datatype } from 'faker'

import { MockMember } from '@/mocks/data'
import rawMembers from '@/mocks/data/raw/members.json'
import { RawCouncilMock, RawCouncilorMock } from '@/mocks/data/seedCouncils'

import { alice } from '../keyring/signers'

const ALICE: MockMember = rawMembers[0]
const getMember = (attrs: Partial<MockMember>): MockMember => ({ ...ALICE, ...attrs })

export const getCouncilor = (attrs: Partial<RawCouncilorMock>): RawCouncilorMock => ({
  id: datatype.uuid(),
  electedInCouncilId: '0',
  memberId: '0',
  unpaidReward: 0,
  accumulatedReward: 0,
  stake: 0,
  ...attrs,
})

export const mockMembers: MockMember[] = [
  getMember({ id: '0', handle: 'Council member A' }),
  getMember({ id: '1', handle: 'Council member B' }),
  getMember({ id: '2', handle: 'Council member C' }),
  getMember({ id: '3', handle: 'Council member D' }),
  getMember({ id: '4', handle: 'Council member E' }),
  getMember({ id: '5', handle: 'Council member F' }),
  getMember({ id: '6', handle: 'Council member G' }),
]

export const mockCouncils: RawCouncilMock[] = [
  { id: '0', electedAtBlock: 0, endedAtBlock: 1000 },
  { id: '1', electedAtBlock: 0, endedAtBlock: 1000 },
  { id: '2', electedAtBlock: 0, endedAtBlock: null },
]

export const mockCouncilors: RawCouncilorMock[] = [
  getCouncilor({ electedInCouncilId: '0', memberId: '0' }),
  getCouncilor({ electedInCouncilId: '0', memberId: '1' }),
  getCouncilor({ electedInCouncilId: '0', memberId: '2' }),
  getCouncilor({ electedInCouncilId: '1', memberId: '3' }),
  getCouncilor({ electedInCouncilId: '1', memberId: '0' }),
  getCouncilor({ electedInCouncilId: '1', memberId: '4' }),
  getCouncilor({ electedInCouncilId: '2', memberId: '5' }),
  getCouncilor({ electedInCouncilId: '2', memberId: '6' }),
  getCouncilor({ electedInCouncilId: '2', memberId: '0' }),
]

export const VOTE_DATA = {
  electionRoundId: '0',
  stake: 1200,
  stakeLocked: true,
  castBy: alice.address,
  voteForId: null,
  commitment: '0x3db26e2bd023ccf2d1167fd42d48cc76b1c1e5c1de9003f61e63ec6a337b91a2',
  // For:
  //  cycleId: 1,
  //  salt":"0x16dfff7ba21922067a0c114de774424abcd5d60fc58658a35341c9181b09e94a",
  //  accountId:"5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
  //  optionId:"0"
}

export const CANDIDATE_DATA = {
  id: '0',
  electionRoundId: '0',
  memberId: '0',
  stake: 1000,
  stakingAccountId: '',
  rewardAccountId: '',
  noteMetadata: {
    header: '',
    bulletPoints: [],
    bannerImageUri: '',
    description: '',
  },
}
