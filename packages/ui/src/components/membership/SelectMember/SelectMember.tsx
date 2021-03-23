import React, { useMemo, useState } from 'react'
import { useSearchMembersQuery } from '../../../api/queries'
import { BaseMember } from '../../../common/types'
import { useDebounce } from '../../../hooks/useDebounce'
import { Select } from '../../selects'
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

interface Props {
  onChange: (selected: BaseMember) => void
  filter?: (option: BaseMember) => boolean
  selected?: BaseMember
  disabled?: boolean
}

export const SelectMember = ({ onChange, filter, selected, disabled }: Props) => {
  const baseFilter = filter || (() => true)
  const [search, setSearch] = useState('')
  const searchDebounced = useDebounce(search, 400)
  const { data } = useSearchMembersQuery({ variables: { text: searchDebounced, limit: 10 } })
  const foundMembers = data?.searchMembers || []
  const filteredFoundMembers = useMemo(() => filterByText(foundMembers.filter(baseFilter), searchDebounced), [
    searchDebounced,
    foundMembers,
  ])

  return (
    <Select
      selected={selected}
      onChange={onChange}
      disabled={disabled}
      renderSelected={(option) => <MemberInfo member={option} />}
      placeholder="Select Member or type a member"
      renderList={(onOptionClick) => <OptionsListMember allMembers={filteredFoundMembers} onChange={onOptionClick} />}
      onSearch={(search) => setSearch(search)}
    />
  )
}
