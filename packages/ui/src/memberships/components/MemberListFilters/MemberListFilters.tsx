import React, { ChangeEvent, useReducer } from 'react'
import styled from 'styled-components'

import { ButtonBareGhost, ButtonPrimary } from '../../../common/components/buttons/Buttons'
import { InputComponent, InputElement, InputText, TogglableIcon } from '../../../common/components/forms'
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

  const onSearchKeyDown: React.KeyboardEventHandler | undefined =
    onApply &&
    (({ key }) => {
      key === 'Enter' && onApply(filters)
    })

  return (
    <MemberListFiltersContainer>
      <ClearButton
        size="small"
        onClick={() => {
          dispatch({ type: 'clear' })
          onApply?.(MemberListEmptyFilter)
        }}
      >
        Clear all Filters
      </ClearButton>

      <Fields>
        <InputComponent icon={<SearchIcon />} tight inputWidth="xs">
          <InputText
            placeholder="Search"
            value={search}
            onKeyDown={onSearchKeyDown}
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
        <ButtonPrimary size="medium" onClick={onApply && (() => onApply(filters))}>
          Apply
        </ButtonPrimary>
      </Fields>
    </MemberListFiltersContainer>
  )
}

const ClearButton = styled(ButtonBareGhost)`
  position: absolute;
  top: -32px;
  right: 0;
`

const MemberListFiltersContainer = styled.div`
  display: flex;
  position: relative;
`

const Fields = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-column-gap: 16px;
  height: 64px;
  padding: 0 16px;
  background: ${Colors.Black[100]};

  ${InputElement} {
    min-width: 200px;
    max-width: 400px;
  }
`
