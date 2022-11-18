import React, { useMemo, useReducer, useEffect } from 'react'
import styled from 'styled-components'

import { DatePicker } from '@/common/components/forms/DatePicker'
import { FilterBox } from '@/common/components/forms/FilterBox'
import { camelCaseToText } from '@/common/helpers'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { PartialDateRange, DateRange } from '@/common/types/Dates'
import { objectEquals } from '@/common/utils'
import { SmallMemberSelect } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'
import { ProposalStatus } from '@/proposals/types'

import { FilterTextSelect } from '../../../common/components/selects'

import { toCamelCase } from './helpers'

export interface ProposalFiltersState {
  search: string
  stage: string | null
  type: string | null
  lifetime: PartialDateRange
  proposer: Member | null
}

type FilterKey = keyof ProposalFiltersState

type Clear = { type: 'clear' }
type Change<K extends FilterKey = FilterKey> = K extends FilterKey // Use a conditional type in order to distribue the union type
  ? { type: 'change'; field: K; value: ProposalFiltersState[K] }
  : never
type Update = { type: 'update'; value: ProposalFiltersState }
type Action = Clear | Change | Update

const filterReducer = (filters: ProposalFiltersState, action: Action): ProposalFiltersState => {
  switch (action.type) {
    case 'clear':
      return ProposalEmptyFilter

    case 'change':
      return {
        ...filters,
        [action.field]: typeof action.value == 'string' ? toCamelCase(action.value) : action.value,
      }

    case 'update':
      return {
        search: toCamelCase(action.value.search) || '',
        stage: toCamelCase(action.value.stage),
        type: toCamelCase(action.value.type),
        lifetime:
          action.value.lifetime &&
          Object.entries(action.value.lifetime).reduce(
            (prev, [key, dateString]) => ({ ...prev, [key]: new Date(dateString) }),
            {} as DateRange
          ),
        proposer: action.value.proposer,
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
  const [lastFilter] = useLocalStorage<string>('lastFilter')

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

  useEffect(() => {
    if (filters === ProposalEmptyFilter && lastFilter !== undefined) {
      dispatch({ type: 'update', value: JSON.parse(lastFilter) })
      onApply({ ...JSON.parse(lastFilter) })
    }
  }, [])

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
        <FilterTextSelect
          title="Type"
          options={types.map(camelCaseToText)}
          value={type && camelCaseToText(type)}
          onChange={(value) => {
            dispatch({ type: 'change', field: 'type', value })
            onApply({ ...filters, type: toCamelCase(value) })
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

        <SmallMemberSelect
          title="Proposer"
          value={proposer}
          onChange={(value) => {
            dispatch({ type: 'change', field: 'proposer', value })
            onApply({ ...filters, proposer: value })
          }}
        />

        <FilterTextSelect
          title="Status"
          options={stages.map(camelCaseToText)}
          value={stage && camelCaseToText(stage)}
          onChange={(value) => {
            dispatch({ type: 'change', field: 'stage', value })
            onApply({ ...filters, stage: toCamelCase(value) })
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
