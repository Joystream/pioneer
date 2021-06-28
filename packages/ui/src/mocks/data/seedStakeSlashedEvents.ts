import rawEvents from './raw/stakeSlashedEvents.json'

interface rawStakeSlashedEvent {
  createdAt: string
  groupId: string
  workerId: string
  requestedAmount: number
  slashedAmount: number
  rationale: string
}

export const mockStakeSlashedEvents = rawEvents.map((event) => ({ ...event }))

export const seedStakeSlashedEvent = (event: rawStakeSlashedEvent, server: any) => {
  return server.schema.create('StakeSlashedEvent', event)
}

export function seedStakeSlashedEvents(server: any) {
  mockStakeSlashedEvents.map((event) => seedStakeSlashedEvent(event, server))
}
