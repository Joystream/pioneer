import * as faker from 'faker'

import { Block } from '@/common/types'

export const randomBlock = (): Block => {
  const number = faker.datatype.number(10_000)

  return {
    network: 'OLYMPIA',
    number,
    timestamp: faker.date.past(1).toJSON(),
  }
}

export const randomRawBlock = () => {
  const { number, timestamp, network } = randomBlock()
  return { inBlock: number, createdAt: timestamp, network }
}
