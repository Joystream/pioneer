import faker from 'faker'

export const seedRandomBlockFields = (inBlock?: number) => ({
  inBlock: inBlock ?? faker.datatype.number(10_000) + 1,
  createdAt: faker.date.recent(90).toJSON(),
  network: 'OLYMPIA',
})
