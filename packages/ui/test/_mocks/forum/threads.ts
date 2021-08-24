import { RawForumThreadMock } from '@/mocks/data/seedForum'

export const mockThreads: RawForumThreadMock[] = [
  {
    id: '0',
    categoryId: '0',
    isSticky: false,
    title: 'Test thread',
    authorId: '0',
    createdInEvent: {
      inBlock: 4547,
      createdAt: '2021-05-06T11:24:13.944Z',
      network: 'OLYMPIA',
    },
    status: { __typename: 'ThreadStatusActive' },
  },
  {
    id: '1',
    categoryId: '2',
    isSticky: false,
    title: 'Nested thread',
    authorId: '0',
    createdInEvent: {
      inBlock: 4547,
      createdAt: '2021-05-06T11:24:13.944Z',
      network: 'OLYMPIA',
    },
    status: { __typename: 'ThreadStatusActive' },
  },
]
