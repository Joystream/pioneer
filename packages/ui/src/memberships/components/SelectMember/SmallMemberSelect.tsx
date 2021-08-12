import React, { useEffect, useState } from 'react'

import { ControlProps } from '@/common/components/forms'
import { SimpleSelect } from '@/common/components/selects'
import { useDebounce } from '@/common/hooks/useDebounce'
import { useSearchMembers } from '@/memberships/hooks/useSearchMembers'
import { Member } from '@/memberships/types'

const DISPLAYED_OPTION_LIMIT = 5
const memberEquals = ({ id: idA }: Member) => {
  return ({ id: idB }: Member) => idA === idB
}

interface SmallMemberSelectProps extends ControlProps<Member | null> {
  title?: string
}
export const SmallMemberSelect = ({ value, onChange, title = 'Member' }: SmallMemberSelectProps) => {
  const [search, setSearch] = useState('')
  const searchDebounced = useDebounce(search, 400)

  const data = useSearchMembers({
    search: searchDebounced,
    limit: DISPLAYED_OPTION_LIMIT - (searchDebounced ? 0 : 1),
  })

  const [members, setMembers] = useState({ isSearch: data.isSearch, options: data.members ?? [] })
  useEffect(() => {
    const { isSearch, members } = data
    if (!members) {
      return
    } else if (isSearch || !value || members.some(({ id }) => id === value.id)) {
      setMembers({ isSearch, options: members })
    } else {
      setMembers({ isSearch, options: [...members.slice(0, DISPLAYED_OPTION_LIMIT - 2), value] })
    }
  }, [data.members?.map(({ id }) => id).toString(), value?.id])

  useEffect(() => {
    search && setSearch('')
  }, [value])

  return (
    <SimpleSelect
      title={title}
      options={members.options}
      renderOption={({ handle }) => handle}
      emptyOption={members.isSearch ? undefined : 'All'}
      optionEquals={memberEquals}
      value={value}
      onChange={onChange}
      onSearch={setSearch}
    />
  )
}
