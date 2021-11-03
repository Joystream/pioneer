import faker from 'faker'

import rawCandidates from './raw/candidates.json'
import rawCouncilors from './raw/councilors.json'
import rawCouncils from './raw/councils.json'
import rawElections from './raw/electionRounds.json'
import rawVotes from './raw/votes.json'

export interface RawCouncilorMock {
  id: string
  electedInCouncilId: string
  memberId: string
  unpaidReward: number
  stake: number
  accumulatedReward: number
}

export interface RawCouncilMock {
  id: string
  electedAtBlock: number
  endedAtBlock: number | null
}

export interface RawCouncilCandidateMock {
  id: string
  memberId: string
  electionRoundId: string
  stake: number
  stakingAccountId: string
  rewardAccountId: string
  note?: string
  noteMetadata: {
    header: string
    bulletPoints: string[]
    bannerImageUri: string
    description: string
  }
}

export interface RawCouncilElectionMock {
  id: string
  cycleId: number
  isFinished: boolean
  electedCouncilId: string
}

export interface RawCouncilVoteMock {
  id?: string
  electionRoundId: string
  stake: number
  stakeLocked: boolean
  voteForId: string | null
  castBy: string
  commitment: string
}

export const seedCouncilMember = (data: RawCouncilorMock, server: any) => server.schema.create('CouncilMember', data)

export const seedCouncilMembers = (server: any) => {
  rawCouncilors.map((data) => seedCouncilMember(data, server))
}

export const seedElectedCouncil = (data: RawCouncilMock, server: any) => {
  return server.schema.create('ElectedCouncil', { ...data, isResigned: !!data.endedAtBlock })
}

export const seedElectedCouncils = (server: any, howMany?: number) => {
  rawCouncils.slice(0, howMany).map((data) => seedElectedCouncil(data, server))
}

export const seedCouncilElection = (data: RawCouncilElectionMock, server: any) =>
  server.schema.create('ElectionRound', { ...data, updatedAt: new Date().toISOString() })

export const seedCouncilElections = (server: any, howMany?: number) => {
  rawElections.slice(0, howMany).map((data) => seedCouncilElection(data, server))
}

export const seedCouncilCandidate = (data: RawCouncilCandidateMock, server: any) => {
  const noteMetadata = server.schema.create('CandidacyNoteMetadata', { ...data.noteMetadata })

  return server.schema.create('Candidate', {
    ...data,
    noteMetadata,
  })
}

export const seedCouncilCandidates = (server: any, overrides?: Partial<RawCouncilCandidateMock>[]) =>
  optionalOverride(rawCandidates, overrides).map((data) => seedCouncilCandidate(data, server))

export const seedCouncilVote = (data: RawCouncilVoteMock, server: any) => {
  const roundNumber = parseInt(data.electionRoundId)
  return server.schema.create('CastVote', {
    ...data,
    createdAt: faker.date.recent(10, roundNumber == 4 ? undefined : faker.date.past(4 - roundNumber)).toISOString(),
  })
}

export const seedCouncilVotes = (server: any, overrides?: Partial<RawCouncilVoteMock>[]) =>
  optionalOverride(rawVotes, overrides).map((data) => seedCouncilVote(data, server))

const optionalOverride = <T>(data: T[], overrides?: Partial<T>[]): T[] =>
  overrides?.map<T>((override, index) => ({ ...data[index], ...override })) ?? data
