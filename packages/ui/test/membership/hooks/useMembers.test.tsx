import { renderHook } from '@testing-library/react-hooks'

import { MembershipOrderByInput } from '@/common/api/queries'
import { MemberListFilter, MemberListEmptyFilter } from '@/memberships/components/MemberListFilters'
import { MemberListOrder, DefaultMemberListOrder, useMembers } from '@/memberships/hooks/useMembers'
import { asMember, Member } from '@/memberships/types'
import { MockMember, mockMembers } from '@/mocks/data/mockMembers'

import { useFilterMembersQuery } from '../../../src/memberships/queries'

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
  useFilterMembersQuery: jest.fn(() => ({})),
}))
const mockedUseFilterMembersQuery = useFilterMembersQuery as jest.Mock

describe('useMembers', () => {
  beforeEach(() => {
    mockedUseFilterMembersQuery.mockClear()
  })

  it('Default order', () => {
    renderUseMembers({})
    expect(useFilterMembersQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc },
    })
  })

  it('Inverse order', () => {
    renderUseMembers({ order: { isDescending: true } })
    expect(useFilterMembersQuery).toBeCalledWith({
      variables: { orderBy: EntryDesc },
    })
  })

  it('Order by handle', () => {
    renderUseMembers({ order: { sortBy: 'handle' } })
    expect(useFilterMembersQuery).toBeCalledWith({
      variables: { orderBy: HandleAsc },
    })
  })

  it('Search by handle', () => {
    renderUseMembers({ filter: { search: 'alice' } })
    expect(useFilterMembersQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc, search: 'alice' },
    })
  })

  it('Search by Id', () => {
    renderUseMembers({ filter: { search: '#42' } })
    expect(useFilterMembersQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc, id: '42' },
    })
  })

  it('Founding members filter', () => {
    renderUseMembers({ filter: { onlyFounder: true } })
    expect(useFilterMembersQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc, isFoundingMember: true },
    })
  })

  it('Verified members filter', () => {
    renderUseMembers({ filter: { onlyVerified: true } })
    expect(useFilterMembersQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc, isVerified: true },
    })
  })

  it('Paginate', () => {
    renderUseMembers({ limit: 5, offset: 10 })
    expect(useFilterMembersQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc, limit: 5, offset: 10 },
    })
  })

  it('Return loading state', () => {
    mockedUseFilterMembersQuery.mockReturnValue({ loading: true })
    const { result } = renderUseMembers({ filter: { onlyVerified: true } })
    expect(result.current).toStrictEqual({ isLoading: true, members: [] })
  })

  it('Return members', () => {
    const data = { memberships: mockMembers.slice(0, 2) }
    const members = data.memberships.map(asMember as (d: MockMember) => Member)

    mockedUseFilterMembersQuery.mockReturnValue({ data, loading: false })

    const { result } = renderUseMembers({ filter: { onlyVerified: true } })
    expect(result.current).toStrictEqual({ isLoading: false, members })
  })
})
