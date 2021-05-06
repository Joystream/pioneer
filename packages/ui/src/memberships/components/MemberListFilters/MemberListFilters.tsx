import React, { ChangeEvent, useReducer } from 'react'
import styled from 'styled-components'

import { ButtonPrimary } from '../../../common/components/buttons/Buttons'
import { InputComponent, InputText, TogglableIcon } from '../../../common/components/forms'
import { FounderMemberIcon, SearchIcon, VerifiedMemberIcon } from '../../../common/components/icons'
import { SimpleSelect } from '../../../common/components/selects'
import { Colors } from '../../../common/constants'

export interface MemberListFilter {
  search: string
  role: string | null
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
  roles: { [k: string]: string }
  onApply?: (value: MemberListFilter) => void
}
export const MemberListFilters = ({ roles, onApply }: MemberListFiltersProps) => {
  const [filters, dispatch] = useReducer(filterReducer, MemberListEmptyFilter)
  const { search, role, concil, onlyVerified, onlyFounder } = filters

  return (
    <MemberListFiltersContainer>
      <ClearBtn
        onClick={() => {
          dispatch({ type: 'clear' })
          onApply?.(MemberListEmptyFilter)
        }}
      >
        Clear all Filters
      </ClearBtn>

      <Fields>
        <InputComponent icon={<SearchIcon />}>
          <InputText
            placeholder="Search"
            value={search}
            onKeyDown={
              onApply &&
              (({ key }) => {
                key === 'Enter' && onApply(filters)
              })
            }
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              const { value } = evt.target
              dispatch({ type: 'change', field: 'search', value })
            }}
          />
        </InputComponent>

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

        <ButtonPrimary onClick={onApply && (() => onApply(filters))}>Apply</ButtonPrimary>
      </Fields>
    </MemberListFiltersContainer>
  )
}

const ClearBtn = styled.button`
  border: none;
  margin: 0;
  padding: 0.5rem;
  width: auto;
  overflow: visible;
  cursor: pointer;
  background: transparent;
  color: ${Colors.Grey};
  font: inherit;
  line-height: normal;
  appearance: none;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
`

const MemberListFiltersContainer = styled.div`
  text-align: end;
`

const Fields = styled.div`
  background: ${Colors.Black[100]};
  display: flex;
  align-items: center;
  box-sizing: content-box;
  padding: 1rem;
  height: 48px;
  gap: 1rem;
  text-align: initial;
  & > div {
    width: auto;
  }
  & > :last-child {
    margin-left: auto;
  }
`
