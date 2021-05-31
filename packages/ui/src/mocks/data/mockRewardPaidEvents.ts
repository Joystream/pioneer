import rawEvents from './raw/rewardPaidEvents.json'

interface RawRewardPaidEvent {
  id: string
  createdAt: string
  eventId: string
  groupId: string
  workerId: string
  rewardAccount: string
  amount: string
  type: string
}

export const mockEvents = rawEvents.map((rawEvent) => ({ ...rawEvent }))

const seedEvent = (mockEvent: RawRewardPaidEvent, server: any) => {
  const event = server.schema.find('Event', mockEvent.eventId)
  const group = server.schema.find('WorkingGroup', mockEvent.groupId)
  const worker = server.schema.find('Worker', mockEvent.workerId)

  return server.schema.create('RewardPaidEvent', {
    ...mockEvent,
    event,
    group,
    worker,
  })
}
export const seedRewardPaidEvents = (server: any) => mockEvents.map((event) => seedEvent(event, server))
