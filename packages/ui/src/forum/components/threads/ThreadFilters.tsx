import React, { FC, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'

import { DatePicker } from '@/common/components/forms/DatePicker'
import { Fields, FilterBox } from '@/common/components/forms/FilterBox'
import { FilterTextSelect, SelectContainer } from '@/common/components/selects'
import { PartialDateRange } from '@/common/types/Dates'
import { objectEquals } from '@/common/utils'
import { SmallMemberSelect } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

export interface ThreadFiltersState {
  tag: string | null
  author: Member | null
  date: PartialDateRange
}
const ThreadEmptyFilters: ThreadFiltersState = { tag: null, author: null, date: undefined }
const isFilterEmpty = objectEquals(ThreadEmptyFilters)

interface ThreadFiltersProps {
  withinDates?: PartialDateRange
  onApply: (filters: ThreadFiltersState) => void
}
export const ThreadFilters: FC<ThreadFiltersProps> = ({ withinDates, onApply, children }) => {
  const [filters, setFilters] = useState(ThreadEmptyFilters)
  const { tag, author, date } = filters

  const update = useCallback(
    (change: Partial<ThreadFiltersState> = filters, apply = true) => {
      const state = { ...filters, ...change }
      if (state !== filters) setFilters(state)
      if (apply) onApply(state)
    },
    [onApply, filters]
  )
  const clear = useMemo(() => (isFilterEmpty(filters) ? undefined : () => update(ThreadEmptyFilters)), [update])

  return (
    <ThreadFiltersBox onApply={() => update()} onClear={clear}>
      <FieldsHeader>{children}</FieldsHeader>

      <FilterTextSelect title="Tags" options={[] as string[]} value={tag} onChange={(tag) => update({ tag })} />

      <SmallMemberSelect title="Author" value={author} onChange={(author) => update({ author })} />

      <DatePicker
        title="Created"
        value={date}
        withinDates={withinDates}
        onChange={(date) => update({ date }, false)}
        onApply={() => update()}
        onClear={() => update({ date: undefined })}
        inputSize="xs"
        inputWidth="auto"
      />
    </ThreadFiltersBox>
  )
}

const ThreadFiltersBox = styled(FilterBox)`
  ${Fields} {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  ${SelectContainer} {
    flex-basis: 220px;
  }
`

const FieldsHeader = styled.div`
  margin-right: auto;
`
