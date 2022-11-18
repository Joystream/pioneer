import React, { useState } from 'react'

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
    skip: !searchDebounced,
  })

  return (
    <SimpleSelect
      title={title}
      options={data.members ?? []}
      renderOption={({ handle }) => handle}
      emptyOption="All"
      optionEquals={memberEquals}
      value={value}
      onChange={onChange}
      onSearch={setSearch}
    />
  )
}
