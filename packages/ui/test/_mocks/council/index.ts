import { datatype } from 'faker'

import { MockMember } from '@/mocks/data'
import { BlockFieldsMock } from '@/mocks/data/common'
import rawMembers from '@/mocks/data/raw/members.json'
import { RawCouncilMock, RawCouncilorMock } from '@/mocks/data/seedCouncils'

const block: BlockFieldsMock = {
  inBlock: 1000,
  createdAt: Date(),
  network: 'OLYMPIA',
}

const ALICE: MockMember = rawMembers[0]
const getMember = (attrs: Partial<MockMember>): MockMember => ({ ...ALICE, ...attrs })

const getCouncilor = (attrs: Partial<RawCouncilorMock>): RawCouncilorMock => ({
  id: datatype.uuid(),
  electedInCouncilId: '0',
  memberId: '0',
  unpaidReward: 0,
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
  { id: '0', endedAtBlock: block },
  { id: '1', endedAtBlock: block },
  { id: '2', endedAtBlock: null },
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
