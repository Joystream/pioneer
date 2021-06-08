import rawEvents from './raw/budgetSpendingEvents.json'

interface RawBudgetSpendingEvent {
  id: string
  createdAt: string
  groupId: string
  workerId: string
  rewardAccount: string
  amount: number
  reciever: string
}

export const mockEvents = rawEvents.map((rawEvent) => ({ ...rawEvent }))

export const seedBudgetSpendingEvent = (mockEvent: RawBudgetSpendingEvent, server: any) => {
  return server.schema.create('BudgetSpendingEvent', mockEvent)
}
export const seedBudgetSpendingEvents = (server: any) =>
  mockEvents.map((event) => seedBudgetSpendingEvent(event, server))
