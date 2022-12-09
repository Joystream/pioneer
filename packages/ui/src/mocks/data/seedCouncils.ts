import { BaseEvent } from '@/mocks/data/seedEvents'

import { seedOverridableEntities } from '../helpers/seedEntities'

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
  electedAtTime: string
  electedAtNetwork: string
  endedAtBlock?: number
  endedAtTime?: string
  endedAtNetwork?: string
  isResigned?: boolean
}

export interface RawCouncilCandidateMock {
  id: string
  memberId: string
  electionRoundId: string
  stake: number
  stakingAccountId: string
  rewardAccountId: string
  status?: string
  note?: string
  votePower: string
  votesReceived?: RawCouncilVoteMock[]
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
  endedAtBlock?: number
  endedAtTime?: string
  endedAtNetwork?: string
  electedCouncilId: string
}

export interface RawCouncilVoteMock {
  id?: string
  electionRoundId: string
  stake: number
  stakeLocked: boolean
  voteForId?: string | null
  castBy: string
  commitment: string
  voteCastEvent: Omit<Required<BaseEvent>, 'id'>
}

export const seedCouncilMember = (data: RawCouncilorMock, server: any) => server.schema.create('CouncilMember', data)

export const seedCouncilMembers = (server: any) => {
  rawCouncilors.map((data) => seedCouncilMember(data, server))
}

export const seedElectedCouncil = (data: RawCouncilMock, server: any) => {
  return server.schema.create('ElectedCouncil', { ...data, isResigned: !!data.endedAtBlock })
}

export const seedElectedCouncils = seedOverridableEntities<RawCouncilMock>(rawCouncils, seedElectedCouncil)

export const seedCouncilElection = (data: RawCouncilElectionMock, server: any) =>
  server.schema.create('ElectionRound', { ...data, updatedAt: new Date().toISOString() })

export const seedCouncilElections = seedOverridableEntities(rawElections, seedCouncilElection)

export const seedCouncilCandidate = (data: RawCouncilCandidateMock, server: any) => {
  const noteMetadata = server.schema.create('CandidacyNoteMetadata', { ...data.noteMetadata })
  const votesReceived = data?.votesReceived
    ? data.votesReceived.map((vote) =>
        server.schema.create('CastVote', {
          ...vote,
        })
      )
    : []
  return server.schema.create('Candidate', {
    status: 'ACTIVE',
    ...data,
    noteMetadata,
    votesReceived,
  })
}

export const seedCouncilCandidates = seedOverridableEntities(rawCandidates, seedCouncilCandidate)

export const seedCouncilVote = (data: RawCouncilVoteMock, server: any) => {
  return server.schema.create('CastVote', {
    ...data,
    createdAt: new Date(data.voteCastEvent.createdAt).toISOString(),
    votecasteventcastVote: [server.schema.create('VoteCastEvent', data.voteCastEvent)],
  })
}

export const seedCouncilVotes = seedOverridableEntities<RawCouncilVoteMock>(rawVotes, seedCouncilVote)
