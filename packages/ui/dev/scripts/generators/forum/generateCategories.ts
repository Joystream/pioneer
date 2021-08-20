import faker from 'faker'

import { CategoryStatus } from '@/forum/types'
import { RawForumCategoryMock } from '@/mocks/data/seedForum'

import workers from '../../../../src/mocks/data/raw/workers.json'
import { randomBlock, randomFromRange } from '../utils'

let nextId = 0

export const generateCategories = (depth: number, parent?: RawForumCategoryMock): RawForumCategoryMock[] => {
  const numberOfCategories = parent ? randomFromRange(0, 2) : 3
  return [...new Array(numberOfCategories)].flatMap(() => generateCategory(depth - 1, parent))
}

export const ActiveStatus: CategoryStatus = 'CategoryStatusActive'
export const ArchiveStatus: CategoryStatus = 'CategoryStatusArchived'

const generateCategory = (depth: number, parent?: RawForumCategoryMock): RawForumCategoryMock[] => {
  const isArchived = parent?.status.__typename === ArchiveStatus || Math.random() < 0.25
  const category: RawForumCategoryMock = {
    id: (nextId++).toString(),
    title: faker.lorem.words(randomFromRange(3, 5)),
    description: faker.lorem.paragraph(randomFromRange(2, 3)),
    parentId: parent?.id ?? null,
    moderatorIds: faker.random.arrayElements(workers, randomFromRange(1, 8)).map(({ id }) => id),
    status: {
      __typename: isArchived ? ArchiveStatus : ActiveStatus,
      ...(isArchived ? { categoryArchivalStatusUpdatedEvent: randomBlock() } : {}),
    },
  }
  return [category, ...(depth ? generateCategories(depth, category) : [])]
}
