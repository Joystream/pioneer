import { renderHook } from '@testing-library/react-hooks'
import { endOfYesterday } from 'date-fns'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import { useForumCategoryThreads } from '@/forum/hooks/useForumCategoryThreads'
import { useGetPaginatedForumThreadsQuery } from '@/forum/queries'

import { getMember } from '../../_mocks/members'

type Props = Parameters<typeof useForumCategoryThreads>

const renderUseForumCategoryThreads = (...props: Props) =>
  renderHook((props: Props) => useForumCategoryThreads(...props), { initialProps: props })

jest.mock('../../../src/forum/queries', () => ({
  useGetPaginatedForumThreadsQuery: jest.fn(() => ({})),
}))
const mockedQueryHook = useGetPaginatedForumThreadsQuery as jest.Mock

const { IsStickyDesc, UpdatedAtAsc, AuthorDesc } = ForumThreadOrderByInput

describe('useForumCategoryThreads', () => {
  afterEach(() => {
    mockedQueryHook.mockClear()
  })

  it('Default', () => {
    renderUseForumCategoryThreads({})

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: { status_json: { isTypeOf_eq: 'ThreadStatusActive' } },
        orderBy: [IsStickyDesc, UpdatedAtAsc],
        first: 30,
      },
    })
  })

  it('Filter', () => {
    const categoryId = '0'
    const author = getMember('alice')
    const start = endOfYesterday()
    const end = new Date()

    const { refresh } = renderUseForumCategoryThreads({ categoryId }).result.current

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: {
          category: { id_eq: categoryId },
          status_json: { isTypeOf_eq: 'ThreadStatusActive' },
        },
        orderBy: [IsStickyDesc, UpdatedAtAsc],
        first: 30,
      },
    })

    refresh({ filters: { author, date: { start, end }, tag: null } })

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: {
          category: { id_eq: categoryId },
          status_json: { isTypeOf_eq: 'ThreadStatusActive' },
          author_eq: author.id,
          createdAt_gte: start,
          createdAt_lte: end,
        },
        orderBy: [IsStickyDesc, UpdatedAtAsc],
        first: 30,
      },
    })
  })

  it('Order', () => {
    renderUseForumCategoryThreads({ order: { key: 'Author', isDescending: true } })

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: { status_json: { isTypeOf_eq: 'ThreadStatusActive' } },
        orderBy: [IsStickyDesc, AuthorDesc],
        first: 30,
      },
    })
  })

  it('Archived', () => {
    const start = endOfYesterday()
    const end = new Date()

    const { refresh } = renderUseForumCategoryThreads({ isArchive: true }).result.current

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: {
          status_json: { isTypeOf_eq: 'ThreadStatusLocked' },
        },
        orderBy: [IsStickyDesc, UpdatedAtAsc],
        first: 30,
      },
    })

    refresh({ filters: { author: null, date: { start, end }, tag: null } })

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: {
          status_json: {
            isTypeOf_eq: 'ThreadStatusLocked',
            threadDeletedEvent: { createdAt_gte: start, createdAt_lte: end },
          },
        },
        orderBy: [IsStickyDesc, UpdatedAtAsc],
        first: 30,
      },
    })
  })
})
