import React, { useReducer } from 'react'
import styled from 'styled-components'

import { ButtonPrimary } from '../../../common/components/buttons/Buttons'
import { InputComponent, InputText, TogglableIcon } from '../../../common/components/forms'
import { FounderMemberIcon, VerifiedMemberIcon } from '../../../common/components/icons'
import { SimpleSelect } from '../../../common/components/selects'
import { Colors } from '../../../common/constants'

export interface MemberListFilter {
  search: string
  role: string | null
  concil: boolean | null
  onlyVerified: boolean
  onlyFounder: boolean
}

const CouncilOpts = {
  All: null,
  Yes: true,
  no: false,
}

type Action =
  | { type: 'clear' }
  | { type: 'change'; field: 'search'; value: MemberListFilter['search'] }
  | { type: 'change'; field: 'role'; value: MemberListFilter['role'] }
  | { type: 'change'; field: 'concil'; value: MemberListFilter['concil'] }
  | { type: 'change'; field: 'onlyVerified'; value: MemberListFilter['onlyVerified'] }
  | { type: 'change'; field: 'onlyFounder'; value: MemberListFilter['onlyFounder'] }

export const MemberListEmptyFilter: MemberListFilter = {
  search: '',
  role: null,
  concil: CouncilOpts.All,
  onlyVerified: false,
  onlyFounder: false,
}

const filterReducer = (filters: MemberListFilter, action: Action): MemberListFilter => {
  switch (action.type) {
    case 'clear':
      return MemberListEmptyFilter

    case 'change':
      return { ...filters, [action.field]: action.value }
  }
  return filters
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
        <InputComponent icon={<>🔍</>} /* TODO replace by the actual icon */>
          <InputText
            placeholder="Search"
            value={search}
            onChange={(evt) => {
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
            console.log('onlyVerified', value)
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
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
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
