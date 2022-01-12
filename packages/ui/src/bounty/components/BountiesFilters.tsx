import React, { useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { FilterBox } from '@/common/components/forms/FilterBox'
import { FilterTextSelect } from '@/common/components/selects'
import { camelCaseToText } from '@/common/helpers'
import { objectEquals } from '@/common/utils'
import { SmallMemberSelect } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'
import { toCamelCase } from '@/proposals/components/ProposalFilters/helpers'

import { bountyPeriods } from '../helpers'

export interface BountyFiltersState {
  search: string
  period: string | null
  creator: Member | null
  oracle: Member | null
}

type FilterKey = keyof BountyFiltersState

type Clear = { type: 'clear' }
type Change<K extends FilterKey = FilterKey> = K extends FilterKey
  ? { type: 'change'; field: K; value: BountyFiltersState[K] }
  : never
type Action = Clear | Change

const filterReducer = (filters: BountyFiltersState, action: Action): BountyFiltersState => {
  switch (action.type) {
    case 'clear':
      return BountyEmptyFilter

    case 'change':
      return {
        ...filters,
        [action.field]: typeof action.value == 'string' ? toCamelCase(action.value) : action.value,
      }
  }
}

export const BountyEmptyFilter: BountyFiltersState = {
  search: '',
  period: null,
  creator: null,
  oracle: null,
}

const isFilterEmpty = objectEquals(BountyEmptyFilter)

export interface BountyFiltersProps {
  searchSlot: React.RefObject<HTMLDivElement>
  onApply: (value: BountyFiltersState) => void
  periodFilter?: boolean
}

export const BountyFilters = ({ searchSlot, onApply, periodFilter }: BountyFiltersProps) => {
  const { t } = useTranslation('bounty')

  const [filters, dispatch] = useReducer(filterReducer, BountyEmptyFilter)
  const { search, period, creator, oracle } = filters

  const apply = () => onApply(filters)
  const clear = useMemo(
    () =>
      isFilterEmpty(filters)
        ? undefined
        : () => {
            dispatch({ type: 'clear' })
            onApply(BountyEmptyFilter)
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
      searchLabel={t('filters.name')}
      displaySearchReset
    >
      <Fields columns={periodFilter ? 4 : 3}>
        <div ref={searchSlot} />

        {periodFilter && (
          <FilterTextSelect
            title={t('filters.period')}
            options={bountyPeriods.map(camelCaseToText)}
            value={period && camelCaseToText(period)}
            onChange={(value) => {
              dispatch({ type: 'change', field: 'period', value })
              onApply({ ...filters, period: toCamelCase(value) })
            }}
          />
        )}

        <SmallMemberSelect
          title={t('filters.creator')}
          value={creator}
          onChange={(value) => {
            dispatch({ type: 'change', field: 'creator', value })
            onApply({ ...filters, creator: value })
          }}
        />

        <SmallMemberSelect
          title={t('filters.oracle')}
          value={oracle}
          onChange={(value) => {
            dispatch({ type: 'change', field: 'oracle', value })
            onApply({ ...filters, oracle: value })
          }}
        />
      </Fields>
    </FilterBox>
  )
}

const Fields = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: ${({ columns }) => 'repeat(' + columns + ', 1fr)'};
  grid-column-gap: 8px;
  align-items: center;
`
