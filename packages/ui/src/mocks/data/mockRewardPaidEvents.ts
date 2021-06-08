import rawEvents from './raw/rewardPaidEvents.json'

interface RawRewardPaidEvent {
  id: string
  createdAt: string
  eventId: string
  groupId: string
  workerId: string
  rewardAccount: string
  amount: number
  type: string
}

export const mockRewardPaidEvents = rawEvents.map((rawEvent) => ({ ...rawEvent }))

export const seedRewardPaidEvent = (mockEvent: RawRewardPaidEvent, server: any) => {
  return server.schema.create('RewardPaidEvent', mockEvent)
}
export const seedRewardPaidEvents = (server: any) =>
  mockRewardPaidEvents.map((event) => seedRewardPaidEvent(event, server))
