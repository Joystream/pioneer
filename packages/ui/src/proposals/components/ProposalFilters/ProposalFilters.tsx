import React, { useMemo, useReducer } from 'react'
import styled from 'styled-components'

import { DatePicker } from '@/common/components/forms/DatePicker'
import { FilterBox } from '@/common/components/forms/FilterBox'
import { FilterSelect } from '@/common/components/selects'
import { PartialDateRange } from '@/common/types/Dates'
import { objectEquals } from '@/common/utils'
import { Member } from '@/memberships/types'
import { ProposalStatus } from '@/proposals/types'

import { camelCaseToText } from '../../../common/helpers'

import { SelectProposer } from './SelectProposer'

export interface ProposalFiltersState {
  search: string
  stage: ProposalStatus | null
  type: string | null
  lifetime: PartialDateRange
  proposer: Member | null
}

type FilterKey = keyof ProposalFiltersState

type Clear = { type: 'clear' }
type Change<K extends FilterKey = FilterKey> = K extends FilterKey // Use a conditional type in order to distribue the union type
  ? { type: 'change'; field: K; value: ProposalFiltersState[K] }
  : never
type Action = Clear | Change

const filterReducer = (filters: ProposalFiltersState, action: Action): ProposalFiltersState => {
  switch (action.type) {
    case 'clear':
      return ProposalEmptyFilter

    case 'change':
      return {
        ...filters,
        [action.field]: typeof action.value == 'string' ? action.value.replace(/ /g, '') : action.value,
      }
  }
  return filters
}

export const ProposalEmptyFilter: ProposalFiltersState = {
  search: '',
  type: null,
  lifetime: undefined,
  proposer: null,
  stage: null,
}

const isFilterEmpty = objectEquals(ProposalEmptyFilter)

export interface ProposalFiltersProps {
  searchSlot: React.RefObject<HTMLDivElement>
  types: string[]
  withinDates?: PartialDateRange
  stages: ProposalStatus[]
  onApply: (value: ProposalFiltersState) => void
}

export const ProposalFilters = ({ searchSlot, stages, types, withinDates, onApply }: ProposalFiltersProps) => {
  const [filters, dispatch] = useReducer(filterReducer, ProposalEmptyFilter)
  const { search, stage, type, lifetime, proposer } = filters

  const apply = () => onApply(filters)
  const clear = useMemo(
    () =>
      isFilterEmpty(filters)
        ? undefined
        : () => {
            dispatch({ type: 'clear' })
            onApply(ProposalEmptyFilter)
          },
    [onApply, filters]
  )

  return (
    <FilterBox
      search={search}
      searchSlot={searchSlot}
      onApply={apply}
      onClear={clear}
      onSearch={(value) => {
        dispatch({ type: 'change', field: 'search', value })
      }}
    >
      <Fields>
        <FilterSelect
          title="Type"
          options={types.map(camelCaseToText)}
          value={type && camelCaseToText(type)}
          onChange={(value) => {
            dispatch({ type: 'change', field: 'type', value })
            onApply({ ...filters, type: value?.replace(/ /g, '') ?? null })
          }}
        />

        <DatePicker
          title="Lifetime"
          value={lifetime}
          withinDates={withinDates}
          onChange={(value) => {
            dispatch({ type: 'change', field: 'lifetime', value })
          }}
          onApply={apply}
          onClear={() => {
            dispatch({ type: 'change', field: 'lifetime', value: undefined })
            onApply({ ...filters, lifetime: undefined })
          }}
          inputSize="xs"
          inputWidth="auto"
        />

        <SelectProposer
          value={proposer}
          onChange={(value) => {
            dispatch({ type: 'change', field: 'proposer', value })
            onApply({ ...filters, proposer: value })
          }}
        />

        <FilterSelect
          title="Stage"
          options={stages}
          value={stage}
          onChange={(value) => {
            dispatch({ type: 'change', field: 'stage', value })
            onApply({ ...filters, stage: value })
          }}
        />
      </Fields>
    </FilterBox>
  )
}

const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 8px;
  align-items: center;
`
