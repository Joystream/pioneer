import { renderHook } from '@testing-library/react-hooks'

import { repeat } from '@/common/utils'
import { useForumThreadPosts } from '@/forum/hooks/useForumThreadPosts'
import { useGetForumPostsCountQuery, useGetForumPostsIdsLazyQuery, useGetForumPostsLazyQuery } from '@/forum/queries'
import { visiblePostStatuses } from '@/forum/types'

type Props = Parameters<typeof useForumThreadPosts>

const renderUseForumThreadPosts = (...props: Props) =>
  renderHook((props: Props) => useForumThreadPosts(...props), { initialProps: props })

const getPosts = jest.fn()
const getPostIds = jest.fn()

jest.mock('../../../src/forum/queries', () => ({
  useGetForumPostsCountQuery: jest.fn(),
  useGetForumPostsLazyQuery: jest.fn(),
  useGetForumPostsIdsLazyQuery: jest.fn(),
}))

const mockedPostsLazyQuery = useGetForumPostsLazyQuery as jest.Mock
const mockedPostsIdsLazyQuery = useGetForumPostsIdsLazyQuery as jest.Mock
const mockedPostsCountQuery = useGetForumPostsCountQuery as jest.Mock

// NOTE the tests assume `POSTS_PER_PAGE` to be 5
describe('useForumThreadPosts', () => {
  beforeEach(() => {
    getPosts.mockClear()
    getPostIds.mockClear()
    mockedPostsLazyQuery.mockClear().mockReturnValue([getPosts, { loading: false }])
    mockedPostsCountQuery
      .mockClear()
      .mockReturnValue({ loading: false, data: { forumPostsConnection: { totalCount: 42 } } })
    mockedPostsIdsLazyQuery
      .mockClear()
      .mockImplementation(() => {
        const result = {
          data: { forumPosts: repeat((id) => ({ id: String(id) }), 41) },
          variables: getPostIds.mock.calls[0]?.[0]?.variables,
        }
        return [getPostIds, result]
      })
      .mockReturnValueOnce([getPostIds, {}])
  })

  it('By page number', () => {
    const { rerender, result } = renderUseForumThreadPosts('0', { post: null, page: null })
    const where = { thread: { id_eq: '0' }, status_json: { isTypeOf_in: visiblePostStatuses } }

    expect(mockedPostsCountQuery).toBeCalledWith({ variables: { where } })
    expect(getPostIds).not.toHaveBeenCalled()
    expect(getPosts).toBeCalledWith({ variables: { where, offset: 0, limit: 5 } })
    expect(result.current).toMatchObject({ page: 1, pageCount: 9, posts: [] })

    rerender(['0', { post: null, page: '3' }])

    expect(getPostIds).not.toHaveBeenCalled()
    expect(getPosts).toBeCalledWith({ variables: { where, offset: 10, limit: 5 } })
    expect(result.current).toMatchObject({ page: 3, pageCount: 9, posts: [] })
  })

  it('By Post id', () => {
    const { rerender, result } = renderUseForumThreadPosts('0', { post: '8', page: null })
    const where = { thread: { id_eq: '0' }, status_json: { isTypeOf_in: visiblePostStatuses } }

    rerender()

    expect(mockedPostsCountQuery).toBeCalledWith({ variables: { where } })
    expect(getPostIds).toBeCalledWith({ variables: { where, limit: 100000 } })
    expect(getPosts).toBeCalledWith({ variables: { where, offset: 5, limit: 5 } })
    expect(result.current).toMatchObject({ page: 2, pageCount: 9, posts: [] })
  })
})
