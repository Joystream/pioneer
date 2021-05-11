import { renderHook } from '@testing-library/react-hooks'

import { MembershipOrderByInput } from '@/common/api/queries'
import { MemberListEmptyFilter, MemberListFilter } from '@/memberships/components/MemberListFilters'
import { DefaultMemberListOrder, MemberListOrder, MEMBERS_PER_PAGE, useMembers } from '@/memberships/hooks/useMembers'
import { useGetMembershipsConnectionQuery } from '@/memberships/queries'

const { EntryAsc, EntryDesc, HandleAsc } = MembershipOrderByInput

interface RenderUseMembers {
  filter?: Partial<MemberListFilter>
  order?: Partial<MemberListOrder>
  page?: number
}
const renderUseMembers = ({ filter = {}, order = {}, page }: RenderUseMembers) =>
  renderHook(() =>
    useMembers({
      filter: { ...MemberListEmptyFilter, ...filter },
      order: { ...DefaultMemberListOrder, ...order },
      page,
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
      variables: { orderBy: EntryAsc, where: {}, first: MEMBERS_PER_PAGE, last: undefined },
    })
  })

  it('Inverse order', () => {
    renderUseMembers({ order: { isDescending: true } })
    expect(useGetMembershipsConnectionQuery).toBeCalledWith({
      variables: { orderBy: EntryDesc, where: {}, first: MEMBERS_PER_PAGE, last: undefined },
    })
  })

  it('Order by handle', () => {
    renderUseMembers({ order: { sortBy: 'handle' } })
    expect(useGetMembershipsConnectionQuery).toBeCalledWith({
      variables: { orderBy: HandleAsc, where: {}, first: MEMBERS_PER_PAGE, last: undefined },
    })
  })

  it('Search by handle', () => {
    renderUseMembers({ filter: { search: 'alice' } })
    expect(useGetMembershipsConnectionQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc, where: { handle_contains: 'alice' }, first: MEMBERS_PER_PAGE, last: undefined },
    })
  })

  it('Founding members filter', () => {
    renderUseMembers({ filter: { onlyFounder: true } })
    expect(useGetMembershipsConnectionQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc, where: { isFoundingMember_eq: true }, first: MEMBERS_PER_PAGE, last: undefined },
    })
  })

  it('Verified members filter', () => {
    renderUseMembers({ filter: { onlyVerified: true } })
    expect(useGetMembershipsConnectionQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc, where: { isVerified_eq: true }, first: MEMBERS_PER_PAGE, last: undefined },
    })
  })

  it('Pagination', () => {
    renderUseMembers({ page: 2 })
    expect(useGetMembershipsConnectionQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc, where: {}, first: MEMBERS_PER_PAGE * 2, last: MEMBERS_PER_PAGE },
    })
  })

  it('Return loading state', () => {
    mockedUseFilterMembersQuery.mockReturnValue({ loading: true })
    const { result } = renderUseMembers({ filter: { onlyVerified: true } })
    expect(result.current).toStrictEqual({ isLoading: true, members: [] })
  })
})
