import rawEvents from './raw/events.json'

interface RawEvent {
  id: string
  createdAt: string
  type: string
}

export const mockEvents = rawEvents.map((rawEvent) => ({ ...rawEvent }))

const seedEvent = (mockEvent: RawEvent, server: any) => {
  return server.schema.create('Event', mockEvent)
}
export const seedEvents = (server: any) => mockEvents.map((event) => seedEvent(event, server))
