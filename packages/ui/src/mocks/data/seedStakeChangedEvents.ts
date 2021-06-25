import rawStakeDecreasedEvents from './raw/stakeDecreasedEvents.json'
import rawStakeIncreasedEvents from './raw/stakeIncreasedEvents.json'

interface RawEvent {
  createdAt: string
  groupId: string
  workerId: string
  amount: number
}

export const mockStakeDecreasedEvents = rawStakeDecreasedEvents.map((rawEvent) => ({ ...rawEvent }))
export const mockStakeIncreasedEvents = rawStakeIncreasedEvents.map((rawEvent) => ({ ...rawEvent }))

export const seedStakeDecreasedEvent = (mockEvent: RawEvent, server: any) =>
  server.schema.create('StakeDecreasedEvent')

export const seedStakeIncreasedEvent = (mockEvent: RawEvent, server: any) =>
  server.schema.create('StakeIncreasedEvent')

export const seedStakeDecreasedEvents = (server: any) =>
  mockStakeDecreasedEvents.map((event) => seedStakeDecreasedEvent(event, server))

export const seedStakeIncreasedEvents = (server: any) =>
  mockStakeIncreasedEvents.map((event) => seedStakeIncreasedEvent(event, server))
