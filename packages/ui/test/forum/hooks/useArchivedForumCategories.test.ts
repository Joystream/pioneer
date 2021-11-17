import { renderHook } from '@testing-library/react-hooks'

import { ActiveStatus, ArchivedStatus, useArchivedForumCategories } from '@/forum/hooks/useForumCategories'
import { useGetArchivedForumCategoriesQuery } from '@/forum/queries'

type Props = Parameters<typeof useArchivedForumCategories>

const renderUseArchivedForumCategoryThreads = (...props: Props) =>
  renderHook((props: Props) => useArchivedForumCategories(...props), { initialProps: props })

jest.mock('../../../src/forum/queries', () => ({
  useGetArchivedForumCategoriesQuery: jest.fn(() => ({})),
}))
const mockedQueryHook = useGetArchivedForumCategoriesQuery as jest.Mock

describe('useArchivedForumCategories', () => {
  it('Default', () => {
    renderUseArchivedForumCategoryThreads()

    expect(mockedQueryHook).toBeCalledWith({
      variables: {
        where: { status_json: { isTypeOf_eq: ArchivedStatus } },
      },
    })
  })
})
