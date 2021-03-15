import React, { useMemo, useState } from 'react'
import { useSearchMembersQuery } from '../../../api/queries'
import { BaseMember } from '../../../common/types'
import { useDebounce } from '../../../hooks/useDebounce'
import { useMyMemberships } from '../../../hooks/useMyMemberships'
import { Select, SelectProps } from '../../selects'
import { MemberInfo } from '../MemberInfo'
import { OptionsListMember } from './OptionsListMember'

export const filterMember = (filterOut: BaseMember | undefined) => {
  return filterOut ? (member: BaseMember) => member.handle !== filterOut.handle : () => true
}

const filterByText = (options: BaseMember[], text: string) => {
  if (!text.length) {
    return options
  }
  const searchBy = text.toLocaleLowerCase()
  return options.filter(
    ({ handle, id, name }) =>
      name?.toLocaleLowerCase().includes(searchBy) ||
      handle?.toLocaleLowerCase().includes(searchBy) ||
      id.includes(searchBy)
  )
}

export const SelectMember = ({ onChange, filter, selected, disabled }: SelectProps<BaseMember>) => {
  const baseFilter = filter || (() => true)
  const [search, setSearch] = useState('')
  const searchDebounced = useDebounce(search, 400)
  const { members } = useMyMemberships()
  const myMembersHandles = members.map(({ handle }) => handle)
  const filterOutMyMemberships = ({ handle }: BaseMember) => !myMembersHandles.includes(handle)
  const { data } = useSearchMembersQuery({ variables: { text: searchDebounced, limit: 10 } })
  const foundMembers = data?.searchMembers || []
  const allMembers = foundMembers.filter(filterOutMyMemberships)
  const filteredMembers = useMemo(() => filterByText(members.filter(baseFilter), searchDebounced), [
    searchDebounced,
    members,
  ])
  const filteredFoundMembers = useMemo(() => filterByText(allMembers.filter(baseFilter), searchDebounced), [
    searchDebounced,
    allMembers,
  ])

  return (
    <Select
      selected={selected}
      onChange={onChange}
      disabled={disabled}
      renderSelected={(option) => <MemberInfo member={option} />}
      placeholder="Select Member or type a member"
      renderList={(onOptionClick) => (
        <OptionsListMember myMembers={filteredMembers} allMembers={filteredFoundMembers} onChange={onOptionClick} />
      )}
      onSearch={(search) => setSearch(search)}
    />
  )
}
