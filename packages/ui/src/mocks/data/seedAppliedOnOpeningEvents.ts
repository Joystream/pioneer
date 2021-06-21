import rawEvents from './raw/appliedOnOpeningEvents.json'

interface RawAppliedOnOpeningEvent {
  id: string
  createdAt: string
  applicationId: string
  openingId: string
}

export const mockAppliedOnOpeningEvents = rawEvents.map((rawEvent) => ({ ...rawEvent }))

export const seedAppliedOnOpeningEvent = (mockEvent: RawAppliedOnOpeningEvent, server: any) => {
  return server.schema.create('AppliedOnOpeningEvent', mockEvent)
}

export const seedAppliedOnOpeningEvents = (server: any) =>
  mockAppliedOnOpeningEvents.map((event) => seedAppliedOnOpeningEvent(event, server))
