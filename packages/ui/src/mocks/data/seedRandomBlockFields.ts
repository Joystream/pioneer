import faker from 'faker'

export const seedRandomBlockFields = () => ({
  inBlock: faker.datatype.number(10_000) + 1,
  createdAt: faker.date.recent(90).toJSON(),
  network: 'OLYMPIA',
})
