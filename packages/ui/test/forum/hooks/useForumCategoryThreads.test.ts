import { renderHook } from '@testing-library/react-hooks'
import { endOfYesterday } from 'date-fns'
import { act } from 'react-dom/test-utils'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import { SortOrder } from '@/common/hooks/useSort'
import { useForumCategoryThreads } from '@/forum/hooks/useForumCategoryThreads'
import { useGetForumThreadsCountQuery, useGetForumThreadsQuery } from '@/forum/queries'

import { getMember } from '../../_mocks/members'

type Props = Parameters<typeof useForumCategoryThreads>

const renderUseForumCategoryThreads = (...props: Props) =>
  renderHook((props: Props) => useForumCategoryThreads(...props), { initialProps: props })

jest.mock('../../../src/forum/queries', () => ({
  useGetForumThreadsQuery: jest.fn(() => ({})),
  useGetForumThreadsCountQuery: jest.fn(() => ({})),
}))

const mockedQueryHook = useGetForumThreadsQuery as jest.Mock
const mockedQueryCountHook = useGetForumThreadsCountQuery as jest.Mock

const { IsStickyDesc, UpdatedAtDesc, AuthorDesc } = ForumThreadOrderByInput

const order: SortOrder<ForumThreadOrderByInput> = {
  orderKey: 'updatedAt',
  isDescending: true,
}

describe('useForumCategoryThreads', () => {
  afterEach(() => {
    mockedQueryHook.mockClear()
    mockedQueryCountHook.mockClear()
  })

  it('Default', () => {
    renderUseForumCategoryThreads({ order })

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: { status_json: { isTypeOf_eq: 'ThreadStatusActive' } },
        orderBy: [IsStickyDesc, UpdatedAtDesc],
        limit: 30,
      },
      pollInterval: 0,
    })
  })

  it('Filter', () => {
    const categoryId = '0'
    const author = getMember('alice')
    const start = endOfYesterday()
    const end = new Date()

    const { refresh } = renderUseForumCategoryThreads({ categoryId, order }).result.current

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: {
          category: { id_eq: categoryId },
          status_json: { isTypeOf_eq: 'ThreadStatusActive' },
        },
        orderBy: [IsStickyDesc, UpdatedAtDesc],
        limit: 30,
      },
      pollInterval: 0,
    })

    act(() => refresh({ filters: { author, date: { start, end }, tag: null } }))

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: {
          category: { id_eq: categoryId },
          status_json: { isTypeOf_eq: 'ThreadStatusActive' },
          author: {
            id_eq: author.id,
          },
          createdAt_gte: start,
          createdAt_lte: end,
        },
        orderBy: [IsStickyDesc, UpdatedAtDesc],
        limit: 30,
      },
      pollInterval: 0,
    })
  })

  it('Order', () => {
    renderUseForumCategoryThreads({ order: { orderKey: 'author', isDescending: true } })

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: { status_json: { isTypeOf_eq: 'ThreadStatusActive' } },
        orderBy: [IsStickyDesc, AuthorDesc],
        limit: 30,
      },
      pollInterval: 0,
    })
  })

  it('Archived', () => {
    const start = endOfYesterday()
    const end = new Date()

    const { rerender } = renderUseForumCategoryThreads({ isArchive: true, order })

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: {
          status_json: { isTypeOf_eq: 'ThreadStatusLocked' },
        },
        orderBy: [IsStickyDesc, UpdatedAtDesc],
        limit: 30,
      },
      pollInterval: 0,
    })

    act(() => rerender([{ isArchive: true, order, filters: { author: null, date: { start, end }, tag: null } }]))

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: {
          status_json: {
            isTypeOf_eq: 'ThreadStatusLocked',
            threadDeletedEvent: { createdAt_gte: start, createdAt_lte: end },
          },
        },
        orderBy: [IsStickyDesc, UpdatedAtDesc],
        limit: 30,
      },
      pollInterval: 0,
    })
  })

  it('Pagination', () => {
    renderUseForumCategoryThreads({ order }, { perPage: 10, page: 1 })

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: { status_json: { isTypeOf_eq: 'ThreadStatusActive' } },
        orderBy: [IsStickyDesc, UpdatedAtDesc],
        limit: 10,
        offset: 0,
      },
      pollInterval: 0,
    })
  })
})
