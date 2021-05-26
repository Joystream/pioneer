import React, { useReducer } from 'react'
import styled from 'styled-components'

import { ButtonPrimary } from '@/common/components/buttons/Buttons'
import { TogglableIcon } from '@/common/components/forms'
import { FilterBox } from '@/common/components/forms/FilterBox'
import { FounderMemberIcon, VerifiedMemberIcon } from '@/common/components/icons'
import { SimpleSelect } from '@/common/components/selects'
import { MemberRole } from '@/memberships/types'

export interface MemberListFilter {
  search: string
  role: MemberRole | null
  concil: boolean | null
  onlyVerified: boolean
  onlyFounder: boolean
}
type FilterKey = keyof MemberListFilter

type Clear = { type: 'clear' }
type Change<K extends FilterKey = FilterKey> = K extends FilterKey // Use a conditional type in order to distribue the union type
  ? { type: 'change'; field: K; value: MemberListFilter[K] }
  : never
type Action = Clear | Change

const filterReducer = (filters: MemberListFilter, action: Action): MemberListFilter => {
  switch (action.type) {
    case 'clear':
      return MemberListEmptyFilter

    case 'change':
      return { ...filters, [action.field]: action.value }
  }
  return filters
}

const CouncilOpts = {
  All: null,
  Yes: true,
  no: false,
}

export const MemberListEmptyFilter: MemberListFilter = {
  search: '',
  role: null,
  concil: CouncilOpts.All,
  onlyVerified: false,
  onlyFounder: false,
}

interface MemberListFiltersProps {
  searchSlot?: React.RefObject<HTMLDivElement>
  roles: { [k: string]: string }
  onApply?: (value: MemberListFilter) => void
}

export const MemberListFilters = ({ searchSlot, roles, onApply }: MemberListFiltersProps) => {
  const [filters, dispatch] = useReducer(filterReducer, MemberListEmptyFilter)
  const { search, role, concil, onlyVerified, onlyFounder } = filters

  const apply = onApply && onApply && (() => onApply(filters))
  const clear = () => {
    dispatch({ type: 'clear' })
    onApply?.(MemberListEmptyFilter)
  }

  const onSearch = (value: string) => {
    dispatch({ type: 'change', field: 'search', value })
  }

  return (
    <FilterBox searchSlot={searchSlot} search={search} onApply={apply} onClear={clear} onSearch={onSearch}>
      <SimpleSelect
        title="Roles"
        options={{ All: null, ...roles }}
        value={role}
        onChange={(value) => {
          dispatch({ type: 'change', field: 'role', value })
        }}
      />
      <SimpleSelect
        title="Council Members"
        options={CouncilOpts}
        value={concil}
        onChange={(value) => {
          dispatch({ type: 'change', field: 'concil', value })
        }}
      />
      <TogglableIcon
        value={onlyVerified}
        onChange={(value) => {
          dispatch({ type: 'change', field: 'onlyVerified', value })
        }}
      >
        <VerifiedMemberIcon />
      </TogglableIcon>
      <TogglableIcon
        value={onlyFounder}
        onChange={(value) => {
          dispatch({ type: 'change', field: 'onlyFounder', value })
        }}
      >
        <FounderMemberIcon />
      </TogglableIcon>
      <ApplyButton size="medium" onClick={apply}>
        Apply
      </ApplyButton>
    </FilterBox>
  )
}

const ApplyButton = styled(ButtonPrimary)`
  margin-left: auto;
`
