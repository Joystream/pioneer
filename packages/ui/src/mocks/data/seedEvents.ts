import * as faker from 'faker'

import { randomRawBlock } from '../helpers/randomBlock'

import rawApplicationWithdrawnEvents from './raw/applicationWithdrawnEvents.json'
import rawAppliedOnOpeningEvents from './raw/appliedOnOpeningEvents.json'
import rawBudgetSetEvents from './raw/budgetSetEvents.json'
import rawBudgetSpendingEvents from './raw/budgetSpendingEvents.json'
import rawCandidacyWithdrawEvents from './raw/candidacyWithdrawEvents.json'
import rawCouncilorRewardUpdatedEvents from './raw/councilorRewardUpdatedEvents.json'
import rawNewMissedRewardLevelReachedEvents from './raw/newMissedRewardLevelReachedEvents.json'
import rawOpeningCanceledEvents from './raw/openingCanceledEvents.json'
import rawOpeningFilledEvents from './raw/openingFilledEvents.json'
import rawProposalVotedEvents from './raw/proposalVotedEvents.json'
import rawRewardPaidEvents from './raw/rewardPaidEvents.json'
import rawStakeDecreasedEvents from './raw/stakeDecreasedEvents.json'
import rawStakeIncreasedEvents from './raw/stakeIncreasedEvents.json'
import rawStakeSlashedEvents from './raw/stakeSlashedEvents.json'
import rawWorkerRewardAccountEvents from './raw/workerRewardAccountUpdatedEvents.json'
import rawWorkerRewardAmountEvents from './raw/workerRewardAmountUpdatedEvents.json'

export interface BaseEvent {
  id?: string
  inBlock?: number
  network?: string
  createdAt: string
}

interface RawApplicationWithdrawnEvent extends BaseEvent {
  applicationId: string
}

interface RawAppliedOnOpeningEvent extends BaseEvent {
  applicationId: string
  openingId: string
}

interface RawBudgetSpendingEvent extends BaseEvent {
  groupId: string
  workerId: string
  rewardAccount: string
  amount: number
  reciever: string
}

interface RawRewardPaidEvent extends BaseEvent {
  groupId: string
  workerId: string
  rewardAccount: string
  amount: number
  type: string
}

interface RawStakeChangedEvent extends BaseEvent {
  workerId: string
  amount: number
}

interface RawStakeSlashedEvent extends BaseEvent {
  workerId: string
  requestedAmount: number
  slashedAmount: number
  rationale: string
}

interface RawOpeningFilledEvent extends BaseEvent {
  groupId: string
  openingId: string
  workersHiredIds: string[]
}

interface OpeningEvent extends BaseEvent {
  groupId: string
  openingId: string
}

interface RawBudgetSetEvent extends BaseEvent {
  groupId: string
  newBudget: number
}

interface RawCouncilorRewardUpdatedEvent extends BaseEvent {
  rewardAmount: number
}

export interface WorkerLeavingEvent extends BaseEvent {
  groupId: string
  workerId: string
}

export interface TerminatedEvent extends BaseEvent {
  groupId: string
  workerId: string
  penalty: number
}

interface WorkerRewardAccountUpdated extends BaseEvent {
  groupId: string
  workerId: string
  newRewardAccount: string
}

interface WorkerRewardAmountUpdated extends BaseEvent {
  groupId: string
  workerId: string
  newRewardPerBlock: number
}

interface RawCandidacyWithdrawEvent extends BaseEvent {
  memberId: string
}

export interface RawProposalVotedEvent extends BaseEvent {
  voterId: string
  proposalId: string
  voteKind: string
  votingRound: number
}

export interface RawNewMissedRewardLevelReachedEvent extends BaseEvent {
  groupId: string
  workerId: string
  newMissedRewardAmount: number
}

export const eventCategories = {
  ApplicationWithdrawnEvent: rawApplicationWithdrawnEvents.map((rawEvent: RawApplicationWithdrawnEvent) => ({
    ...rawEvent,
  })),
  AppliedOnOpeningEvent: rawAppliedOnOpeningEvents.map((rawEvent: RawAppliedOnOpeningEvent) => ({ ...rawEvent })),
  BudgetSpendingEvent: rawBudgetSpendingEvents.map((rawEvent: RawBudgetSpendingEvent) => ({ ...rawEvent })),
  RewardPaidEvent: rawRewardPaidEvents.map((rawEvent: RawRewardPaidEvent) => ({ ...rawEvent })),
  StakeDecreasedEvent: rawStakeDecreasedEvents.map((rawEvent: RawStakeChangedEvent) => ({ ...rawEvent })),
  StakeIncreasedEvent: rawStakeIncreasedEvents.map((rawEvent: RawStakeChangedEvent) => ({ ...rawEvent })),
  StakeSlashedEvent: rawStakeSlashedEvents.map((rawEvent: RawStakeSlashedEvent) => ({ ...rawEvent })),
  OpeningFilledEvent: rawOpeningFilledEvents.map((rawEvent: RawOpeningFilledEvent) => ({ ...rawEvent })),
  OpeningCanceledEvent: rawOpeningCanceledEvents.map((rawEvent: OpeningEvent) => ({ ...rawEvent })),
  BudgetSetEvent: rawBudgetSetEvents.map((rawEvent: RawBudgetSetEvent) => ({ ...rawEvent })),
  CouncilorRewardUpdatedEvent: rawCouncilorRewardUpdatedEvents.map((rawEvent: RawCouncilorRewardUpdatedEvent) => ({
    ...rawEvent,
  })),
  WorkerRewardAccountUpdatedEvent: rawWorkerRewardAccountEvents.map((rawEvent: WorkerRewardAccountUpdated) => ({
    ...rawEvent,
  })),
  WorkerRewardAmountUpdatedEvent: rawWorkerRewardAmountEvents.map((rawEvent: WorkerRewardAmountUpdated) => ({
    ...rawEvent,
  })),
  CandidacyWithdrawEvent: rawCandidacyWithdrawEvents.map((rawEvent: RawCandidacyWithdrawEvent) => ({ ...rawEvent })),
  ProposalVotedEvent: rawProposalVotedEvents.map((rawEvent: RawProposalVotedEvent) => ({ ...rawEvent })),
  NewMissedRewardLevelReachedEvent: rawNewMissedRewardLevelReachedEvents.map(
    (rawEvent: RawNewMissedRewardLevelReachedEvent) => ({ ...rawEvent })
  ),
}

type EventType = keyof typeof eventCategories

export const seedEvent = <T extends BaseEvent>(mockEvent: T, eventType: string, server: any) =>
  server.schema.create(eventType, mockEvent)

export const seedEventCategory = (type: EventType, server: any) =>
  eventCategories[type].map((event) => seedEvent(event, type, server))

export const seedEvents = (server: any) =>
  (Object.keys(eventCategories) as EventType[]).map((category) => seedEventCategory(category, server))

export function seedProposalsEvents(server: any) {
  server.schema.create('ProposalCancelledEvent', {
    ...randomRawBlock(),
    createdAt: faker.date.recent(1),
    proposalId: '1',
  })
  server.schema.create('ProposalDiscussionThreadModeChangedEvent', {
    ...randomRawBlock(),
    createdAt: faker.date.recent(1),
    threadId: '2',
    newMode: server.schema.create('ProposalDiscussionThreadModeClosed'),
  })
  server.schema.create('ProposalExecutedEvent', {
    ...randomRawBlock(),
    createdAt: faker.date.recent(1),
    proposalId: '4',
    executionStatus: server.schema.create('ProposalStatusExecuted'),
  })
  server.schema.create('ProposalDiscussionPostCreatedEvent', {
    ...randomRawBlock(),
    createdAt: faker.date.recent(1),
    postId: '3',
  })
  server.schema.create('ProposalDiscussionPostUpdatedEvent', {
    ...randomRawBlock(),
    createdAt: faker.date.recent(1),
    postId: '4',
  })
  server.schema.create('ProposalDiscussionPostDeletedEvent', {
    ...randomRawBlock(),
    createdAt: faker.date.recent(1),
    postId: '5',
  })
}
