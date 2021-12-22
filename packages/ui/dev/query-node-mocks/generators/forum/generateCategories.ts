import faker from 'faker'

import { CategoryStatusType } from '@/forum/types'
import { RawForumCategoryMock } from '@/mocks/data/seedForum'

import { randomBlock, randomFromRange } from '../utils'

import { MocksForForum } from './generateForumMocks'

let nextId = 0

export const generateCategories = (depth: number, parent?: RawForumCategoryMock) => (
  mocks: MocksForForum
): RawForumCategoryMock[] => {
  const numberOfCategories = parent ? randomFromRange(0, 2) : 3
  return [...new Array(numberOfCategories)].flatMap(() => generateCategory(depth - 1, parent)(mocks))
}

export const ActiveStatus: CategoryStatusType = 'CategoryStatusActive'
export const ArchiveStatus: CategoryStatusType = 'CategoryStatusArchived'

const generateCategory = (depth: number, parent?: RawForumCategoryMock) => (
  mocks: MocksForForum
): RawForumCategoryMock[] => {
  const isArchived = parent?.status.__typename === ArchiveStatus || (nextId > 0 && Math.random() < 0.25)
  const category: RawForumCategoryMock = {
    id: (nextId++).toString(),
    title: faker.lorem.words(randomFromRange(3, 5)),
    description: faker.lorem.paragraph(randomFromRange(2, 3)),
    parentId: parent?.id ?? null,
    moderatorIds: faker.random
      .arrayElements(mocks.workers, randomFromRange(1, 8))
      .map((worker) => worker?.id as string),
    status: {
      __typename: isArchived ? ArchiveStatus : ActiveStatus,
      ...(isArchived ? { categoryArchivalStatusUpdatedEvent: randomBlock() } : {}),
    },
  }
  return [category, ...(depth ? generateCategories(depth, category)(mocks) : [])]
}
