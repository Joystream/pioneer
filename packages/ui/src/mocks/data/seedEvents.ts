import rawApplicationWithdrawnEvents from './raw/applicationWithdrawnEvents.json'
import rawAppliedOnOpeningEvents from './raw/appliedOnOpeningEvents.json'
import rawBudgetSpendingEvents from './raw/budgetSpendingEvents.json'
import rawOpeningFilledEvents from './raw/openingFilledEvents.json'
import rawRewardPaidEvents from './raw/rewardPaidEvents.json'
import rawStakeDecreasedEvents from './raw/stakeDecreasedEvents.json'
import rawStakeIncreasedEvents from './raw/stakeIncreasedEvents.json'
import rawStakeSlashedEvents from './raw/stakeSlashedEvents.json'

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

export const eventCategories = [
  {
    name: 'ApplicationWithdrawnEvent',
    events: rawApplicationWithdrawnEvents.map((rawEvent: RawApplicationWithdrawnEvent) => ({ ...rawEvent })),
  },
  {
    name: 'AppliedOnOpeningEvent',
    events: rawAppliedOnOpeningEvents.map((rawEvent: RawAppliedOnOpeningEvent) => ({ ...rawEvent })),
  },
  {
    name: 'BudgetSpendingEvent',
    events: rawBudgetSpendingEvents.map((rawEvent: RawBudgetSpendingEvent) => ({ ...rawEvent })),
  },
  { name: 'RewardPaidEvent', events: rawRewardPaidEvents.map((rawEvent: RawRewardPaidEvent) => ({ ...rawEvent })) },
  {
    name: 'StakeDecreasedEvent',
    events: rawStakeDecreasedEvents.map((rawEvent: RawStakeChangedEvent) => ({ ...rawEvent })),
  },
  {
    name: 'StakeIncreasedEvent',
    events: rawStakeIncreasedEvents.map((rawEvent: RawStakeChangedEvent) => ({ ...rawEvent })),
  },
  {
    name: 'StakeSlashedEvent',
    events: rawStakeSlashedEvents.map((rawEvent: RawStakeSlashedEvent) => ({ ...rawEvent })),
  },
  {
    name: 'OpeningFilledEvent',
    events: rawOpeningFilledEvents.map((rawEvent: RawOpeningFilledEvent) => ({ ...rawEvent })),
  },
]

export const seedEvent = <T extends BaseEvent>(mockEvent: T, eventType: string, server: any) => {
  return server.schema.create(eventType, mockEvent)
}

export const seedEvents = (server: any) =>
  eventCategories.forEach((category) => category.events.forEach((event) => seedEvent(event, category.name, server)))
