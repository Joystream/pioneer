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
}
const renderUseMembers = ({ filter = {}, order = {} }: RenderUseMembers) =>
  renderHook(() =>
    useMembers({
      filter: { ...MemberListEmptyFilter, ...filter },
      order: { ...DefaultMemberListOrder, ...order },
    })
  )

jest.mock('../../../src/memberships/queries', () => ({
  useFilterMembersQuery: jest.fn(() => ({})),
}))
const mockedUseFilterMembersQuery = useFilterMembersQuery as jest.Mock

describe('useMyMember', () => {
  beforeEach(() => {
    mockedUseFilterMembersQuery.mockClear()
  })

  it('calls the useFilterMembersQuery', () => {
    renderUseMembers({})
    expect(useFilterMembersQuery).toBeCalled()
  })

  it('queries members by ascending ids (default)', () => {
    renderUseMembers({})
    expect(useFilterMembersQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc },
    })
  })

  it('queries members by descending ids', () => {
    renderUseMembers({ order: { isDescending: true } })
    expect(useFilterMembersQuery).toBeCalledWith({
      variables: { orderBy: EntryDesc },
    })
  })

  it('queries members by ascending handles', () => {
    renderUseMembers({ order: { sortBy: 'handle' } })
    expect(useFilterMembersQuery).toBeCalledWith({
      variables: { orderBy: HandleAsc },
    })
  })

  it('queries members matching a search', () => {
    renderUseMembers({ filter: { search: 'alice' } })
    expect(useFilterMembersQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc, search: 'alice' },
    })
  })

  it('queries members by id', () => {
    renderUseMembers({ filter: { search: '#42' } })
    expect(useFilterMembersQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc, id: '42' },
    })
  })

  it('queries founding members only', () => {
    renderUseMembers({ filter: { onlyFounder: true } })
    expect(useFilterMembersQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc, isFoundingMember: true },
    })
  })

  it('queries verified members only', () => {
    renderUseMembers({ filter: { onlyVerified: true } })
    expect(useFilterMembersQuery).toBeCalledWith({
      variables: { orderBy: EntryAsc, isVerified: true },
    })
  })

  it('returns an empty array of members when loading', () => {
    mockedUseFilterMembersQuery.mockReturnValue({ loading: true })
    const { result } = renderUseMembers({ filter: { onlyVerified: true } })
    expect(result.current).toStrictEqual({ isLoading: true, members: [] })
  })

  it('returns the members', () => {
    const data = { memberships: mockMembers.slice(0, 2) }
    const members = data.memberships.map(asMember as (d: MockMember) => Member)

    mockedUseFilterMembersQuery.mockReturnValue({ data, loading: false })

    const { result } = renderUseMembers({ filter: { onlyVerified: true } })
    expect(result.current).toStrictEqual({ isLoading: false, members })
  })
})
