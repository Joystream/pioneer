import { renderHook } from '@testing-library/react-hooks'

import { ActiveStatus, useForumCategories } from '@/forum/hooks/useForumCategories'
import { useGetForumCategoriesQuery } from '@/forum/queries'

type Props = Parameters<typeof useForumCategories>

const renderUseForumCategoryThreads = (...props: Props) =>
  renderHook((props: Props) => useForumCategories(...props), { initialProps: props })

jest.mock('../../../src/forum/queries', () => ({
  useGetForumCategoriesQuery: jest.fn(() => ({})),
}))
const mockedQueryHook = useGetForumCategoriesQuery as jest.Mock

describe('useForumCategories', () => {
  afterEach(() => {
    mockedQueryHook.mockClear()
  })

  it('Default', () => {
    const { rerender } = renderUseForumCategoryThreads({})

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: { status_json: { isTypeOf_eq: ActiveStatus } },
      },
    })

    rerender([{ isRoot: true }])

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: { parent: { id_eq: null }, status_json: { isTypeOf_eq: ActiveStatus } },
      },
    })
  })
})
