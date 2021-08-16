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

const CATEGORY_ID = '0'
const { IsStickyDesc, UpdatedAtAsc, AuthorDesc } = ForumThreadOrderByInput

describe('useForumCategoryThreads', () => {
  afterEach(() => {
    mockedQueryHook.mockClear()
  })

  it('Default', () => {
    renderUseForumCategoryThreads(CATEGORY_ID, {
      filters: { author: null, date: undefined, tag: null },
      order: { key: 'UpdatedAt' },
    })
    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: { category: { id_eq: CATEGORY_ID } },
        orderBy: [IsStickyDesc, UpdatedAtAsc],
        first: 30,
      },
    })
  })

  it('Filter', () => {
    const author = getMember('alice')
    const start = endOfYesterday()
    const end = new Date()

    renderUseForumCategoryThreads(CATEGORY_ID, {
      filters: { author, date: { start, end }, tag: null },
      order: { key: 'UpdatedAt' },
    })

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: {
          category: { id_eq: CATEGORY_ID },
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
    renderUseForumCategoryThreads(CATEGORY_ID, {
      filters: { author: null, date: undefined, tag: null },
      order: { key: 'Author', isDescending: true },
    })

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: { category: { id_eq: CATEGORY_ID } },
        orderBy: [IsStickyDesc, AuthorDesc],
        first: 30,
      },
    })
  })
})
