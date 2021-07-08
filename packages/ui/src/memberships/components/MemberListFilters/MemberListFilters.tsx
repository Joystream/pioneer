import React, { useReducer } from 'react'
import styled from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { TogglableIcon } from '@/common/components/forms'
import { FilterBox, FilterLabel } from '@/common/components/forms/FilterBox'
import { FounderMemberIcon, VerifiedMemberIcon } from '@/common/components/icons'
import { FilterSelect } from '@/common/components/selects'
import { objectEquals } from '@/common/utils'
import { spacing } from '@/common/utils/styles'
import { MemberRole } from '@/memberships/types'

import { SelectMemberRoles } from '../SelectMemberRoles'

export interface MemberListFilter {
  search: string
  roles: MemberRole[]
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

export const MemberListEmptyFilter: MemberListFilter = {
  search: '',
  roles: [],
  concil: null,
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
  const { search, roles, concil, onlyVerified, onlyFounder } = filters

  const apply = () => onApply(filters)
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
    <MembersFilterBox searchSlot={searchSlot} search={search} onApply={apply} onClear={clear} onSearch={onSearch}>
      <Fields>
        <FieldsHeader>
          <h6>All members</h6>
          {memberCount && <MemberCount count={memberCount} />}
        </FieldsHeader>

        <SelectContainer>
          <SelectMemberRoles
            value={roles}
            onChange={(value) => dispatch({ type: 'change', field: 'roles', value })}
            onApply={apply}
            onClear={() => {
              dispatch({ type: 'change', field: 'roles', value: [] })
              onApply({ ...filters, roles: [] })
            }}
          />
        </SelectContainer>

        <SelectContainer>
          <FilterSelect
            title="Council Members"
            options={[true, false]}
            renderOption={(value) => (value ? 'Yes' : 'No')}
            value={concil}
            onChange={(value) => {
              dispatch({ type: 'change', field: 'concil', value })
              onApply({ ...filters, concil: value })
            }}
          />
        </SelectContainer>

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
      </Fields>
    </MembersFilterBox>
  )
}

const MembersFilterBox = styled(FilterBox)`
  height: 72px;
  margin-top: ${spacing(1)};
`

const Fields = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`

const FieldsHeader = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  align-self: center;
  margin-right: auto;
`
const MemberCount = styled(CountBadge)`
  font-weight: 700;
`

const SelectContainer = styled.div`
  flex-basis: 220px;
`

const ToggleContainer = styled.div`
  display: grid;
  gap: 4px 8px;
  grid-template-columns: auto 1fr;
  & > :first-child {
    grid-column: span 2;
  }
`
