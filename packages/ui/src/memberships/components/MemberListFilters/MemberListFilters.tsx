import React, { useReducer } from 'react'
import styled from 'styled-components'

import { TogglableIcon } from '@/common/components/forms'
import { Fields, FilterBox, FilterLabel } from '@/common/components/forms/FilterBox'
import { FounderMemberIcon, VerifiedMemberIcon } from '@/common/components/icons'
import { ItemCount } from '@/common/components/ItemCount'
import { FilterSelect, SelectContainer } from '@/common/components/selects'
import { objectEquals } from '@/common/utils'
import { MemberRole } from '@/memberships/types'

import { SelectMemberRoles } from '../SelectMemberRoles'

export interface MemberListFilter {
  search: string
  role: MemberRole | null
  council: boolean | null
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

export const MemberListEmptyFilter: MemberListFilter = {
  search: '',
  role: null,
  council: null,
  onlyVerified: false,
  onlyFounder: false,
}

const isFilterEmpty = objectEquals(MemberListEmptyFilter, { depth: 2 })

export interface MemberListFiltersProps {
  searchSlot?: React.RefObject<HTMLDivElement>
  memberCount?: number
  onApply: (value: MemberListFilter) => void
}

export const MemberListFilters = ({ searchSlot, memberCount, onApply }: MemberListFiltersProps) => {
  const [filters, dispatch] = useReducer(filterReducer, MemberListEmptyFilter)
  const { search, role, council, onlyVerified, onlyFounder } = filters

  const applyFilters = () => onApply(filters)
  const clear = isFilterEmpty(filters)
    ? undefined
    : () => {
        dispatch({ type: 'clear' })
        onApply(MemberListEmptyFilter)
      }

  const onSearch = (value: string) => {
    dispatch({ type: 'change', field: 'search', value })
  }

  return (
    <MembersFilterBox
      searchSlot={searchSlot}
      search={search}
      onApply={applyFilters}
      onClear={clear}
      onSearch={onSearch}
    >
      <FieldsHeader>
        <ItemCount count={memberCount}>All members</ItemCount>
      </FieldsHeader>

      <SelectMemberRoles
        value={role}
        onChange={(value) => {
          dispatch({ type: 'change', field: 'role', value })
          console.log(value)
          onApply({...filters, role: value})
        }}
        onApply={applyFilters}
        onClear={() => {
          dispatch({ type: 'change', field: 'role', value: null })
          onApply({ ...filters, role: null })
        }}
      />

      <FilterSelect
        title="Council Members"
        options={[true, false]}
        renderOption={(value) => (value ? 'Yes' : 'No')}
        value={council}
        onChange={(value) => {
          dispatch({ type: 'change', field: 'council', value })
          onApply({ ...filters, council: value })
        }}
      />

      <ToggleContainer>
        <FilterLabel>Member Type</FilterLabel>
        <TogglableIcon
          value={onlyVerified}
          onChange={(value) => {
            dispatch({ type: 'change', field: 'onlyVerified', value })
            onApply({ ...filters, onlyVerified: value })
          }}
        >
          <VerifiedMemberIcon />
        </TogglableIcon>

        <TogglableIcon
          value={onlyFounder}
          onChange={(value) => {
            dispatch({ type: 'change', field: 'onlyFounder', value })
            onApply({ ...filters, onlyFounder: value })
          }}
        >
          <FounderMemberIcon />
        </TogglableIcon>
      </ToggleContainer>
    </MembersFilterBox>
  )
}

const MembersFilterBox = styled(FilterBox)`
  height: 72px;
  margin-top: 8px;

  ${Fields} {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px 16px;
    height: 100%;
  }

  ${SelectContainer} {
    flex-basis: 220px;
  }
`

const FieldsHeader = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-right: auto;
`

const ToggleContainer = styled.div`
  display: grid;
  gap: 4px 8px;
  grid-template-columns: auto 1fr;
  height: 48px;

  & > :first-child {
    grid-column: span 2;
  }
`
