import rawApplicationWithdrawnEvents from './raw/applicationWithdrawnEvents.json'
import rawAppliedOnOpeningEvents from './raw/appliedOnOpeningEvents.json'
import rawBudgetSetEvents from './raw/budgetSetEvents.json'
import rawBudgetSpendingEvents from './raw/budgetSpendingEvents.json'
import rawOpeningCanceledEvents from './raw/openingCanceledEvents.json'
import rawOpeningFilledEvents from './raw/openingFilledEvents.json'
import rawRewardPaidEvents from './raw/rewardPaidEvents.json'
import rawStakeDecreasedEvents from './raw/stakeDecreasedEvents.json'
import rawStakeIncreasedEvents from './raw/stakeIncreasedEvents.json'
import rawStakeSlashedEvents from './raw/stakeSlashedEvents.json'
import rawWorkerRewardAccountEvents from './raw/workerRewardAccountUpdatedEvents.json'
import rawWorkerRewardAmountEvents from './raw/workerRewardAmountUpdatedEvents.json'

interface BaseEvent {
  id?: string
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
  WorkerRewardAccountUpdatedEvent: rawWorkerRewardAccountEvents.map((rawEvent: WorkerRewardAccountUpdated) => ({
    ...rawEvent,
  })),
  WorkerRewardAmountUpdatedEvent: rawWorkerRewardAmountEvents.map((rawEvent: WorkerRewardAmountUpdated) => ({
    ...rawEvent,
  })),
}

type EventType = keyof typeof eventCategories

export const seedEvent = <T extends BaseEvent>(mockEvent: T, eventType: string, server: any) =>
  server.schema.create(eventType, mockEvent)

export const seedEventCategory = (type: EventType, server: any) =>
  eventCategories[type].map((event) => seedEvent(event, type, server))

export const seedEvents = (server: any) =>
  (Object.keys(eventCategories) as EventType[]).map((category) => seedEventCategory(category, server))
