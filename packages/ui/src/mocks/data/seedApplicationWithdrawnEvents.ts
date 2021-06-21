import rawEvents from './raw/applicationWithdrawnEvents.json'

interface RawApplicationWithdrawnEvent {
  id: string
  createdAt: string
  applicationId: string
}

export const mockApplicationWithdrawnEvents = rawEvents.map((rawEvent) => ({ ...rawEvent }))

export const seedApplicationWithdrawnEvent = (mockEvent: RawApplicationWithdrawnEvent, server: any) => {
  return server.schema.create('ApplicationWithdrawnEvent', mockEvent)
}

export const seedApplicationWithdrawnEvents = (server: any) =>
  mockApplicationWithdrawnEvents.map((event) => seedApplicationWithdrawnEvent(event, server))
