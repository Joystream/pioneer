import faker from 'faker'

import { RawForumCategoryMock } from '@/mocks/data/seedForum'

import { randomFromRange } from '../utils'

export const generateCategories = (): RawForumCategoryMock[] => {
  let nextId = 0

  return [...new Array(5)].map(() => {
    return {
      id: String(nextId++),
      title: faker.lorem.words(randomFromRange(3, 5)),
      description: faker.lorem.paragraph(randomFromRange(2, 3)),
    }
  })
}
