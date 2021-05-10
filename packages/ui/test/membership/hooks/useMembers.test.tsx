import { renderHook } from '@testing-library/react-hooks'

import { MembershipOrderByInput } from '@/common/api/queries'
import { MemberListEmptyFilter, MemberListFilter } from '@/memberships/components/MemberListFilters'
import { DefaultMemberListOrder, MemberListOrder, useMembers } from '@/memberships/hooks/useMembers'
import { useGetMembershipsConnectionQuery } from '@/memberships/queries'

const { EntryAsc, EntryDesc, HandleAsc } = MembershipOrderByInput

interface RenderUseMembers {
  filter?: Partial<MemberListFilter>
  order?: Partial<MemberListOrder>
  limit?: number
  offset?: number
}
const renderUseMembers = ({ filter = {}, order = {}, ...pagination }: RenderUseMembers) =>
  renderHook(() =>
    useMembers({
      filter: { ...MemberListEmptyFilter, ...filter },
      order: { ...DefaultMemberListOrder, ...order },
      ...pagination,
    })
  )

jest.mock('../../../src/memberships/queries', () => ({
  useGetMembershipsConnectionQuery: jest.fn(() => ({})),
}))

const mockedUseFilterMembersQuery = useGetMembershipsConnectionQuery as jest.Mock

describe('useMembers', () => {
  beforeEach(() => {
    mockedUseFilterMembersQuery.mockClear()
  })

  it('Default order', () => {
    renderUseMembers({})
    expect(useGetMembershipsConnectionQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc, where: {} },
    })
  })

  it('Inverse order', () => {
    renderUseMembers({ order: { isDescending: true } })
    expect(useGetMembershipsConnectionQuery).toBeCalledWith({
      variables: { orderBy: EntryDesc, where: {} },
    })
  })

  it('Order by handle', () => {
    renderUseMembers({ order: { sortBy: 'handle' } })
    expect(useGetMembershipsConnectionQuery).toBeCalledWith({
      variables: { orderBy: HandleAsc, where: {} },
    })
  })

  it('Search by handle', () => {
    renderUseMembers({ filter: { search: 'alice' } })
    expect(useGetMembershipsConnectionQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc, where: { handle_contains: 'alice' } },
    })
  })

  it('Founding members filter', () => {
    renderUseMembers({ filter: { onlyFounder: true } })
    expect(useGetMembershipsConnectionQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc, where: { isFoundingMember_eq: true } },
    })
  })

  it('Verified members filter', () => {
    renderUseMembers({ filter: { onlyVerified: true } })
    expect(useGetMembershipsConnectionQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc, where: { isVerified_eq: true } },
    })
  })

  it('Return loading state', () => {
    mockedUseFilterMembersQuery.mockReturnValue({ loading: true })
    const { result } = renderUseMembers({ filter: { onlyVerified: true } })
    expect(result.current).toStrictEqual({ isLoading: true, members: [] })
  })
})
