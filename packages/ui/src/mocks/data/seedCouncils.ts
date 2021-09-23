import { BlockFieldsMock } from '@/mocks/data/common'

import rawCandidates from './raw/candidates.json'
import rawCouncilors from './raw/councilors.json'
import rawCouncils from './raw/councils.json'
import rawElections from './raw/electionRounds.json'

export interface RawCouncilorMock {
  id: string
  electedInCouncilId: string
  memberId: string
  unpaidReward: number
  stake: number
}

export interface RawCouncilMock {
  id: string
  endedAtBlock: BlockFieldsMock | null
}

export interface RawCouncilCandidateMock {
  id: string
  memberId: string
  cycleIdId: string
  stake: number
}

export interface RawCouncilElectionMock {
  id: string
  cycleId: number
  isFinished: boolean
  electedCouncilId: string
}

export const seedCouncilMember = (data: RawCouncilorMock, server: any) => server.schema.create('CouncilMember', data)

export const seedCouncilMembers = (server: any) => {
  rawCouncilors.map((data) => seedCouncilMember(data, server))
}

export const seedElectedCouncil = (data: RawCouncilMock, server: any) => server.schema.create('ElectedCouncil', data)

export const seedElectedCouncils = (server: any) => {
  rawCouncils.map((data) => seedElectedCouncil(data, server))
}

export const seedCouncilElection = (data: RawCouncilElectionMock, server: any) =>
  server.schema.create('ElectionRound', data)

export const seedCouncilElections = (server: any) => {
  rawElections.map((data) => seedCouncilElection(data, server))
}

export const seedCouncilCandidate = (data: RawCouncilCandidateMock, server: any) =>
  server.schema.create('Candidate', data)

export const seedCouncilCandidates = (server: any) => {
  rawCandidates.map((data) => seedCouncilCandidate(data, server))
}
