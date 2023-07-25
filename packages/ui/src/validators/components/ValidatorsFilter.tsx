import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { FilterBox } from '@/common/components/forms/FilterBox'
import { SearchBox } from '@/common/components/forms/FilterBox/FilterSearchBox'
import { FilterSelect } from '@/common/components/selects'

import { Verification, State } from '../types'

interface ValidatorFilterProps {
  filter: {
    search: string
    setSearch: (search: string) => void
    verification: Verification
    setVerification: (verification: Verification) => void
    state: State
    setState: (state: State) => void
  }
}

export const ValidatorsFilter = ({ filter }: ValidatorFilterProps) => {
  const [search, setSearch] = useState('')
  useEffect(() => {
    setSearch(filter.search)
  }, [filter.search])
  const display = () => filter.setSearch(search)
  const clear =
    filter.search || filter.verification || filter.state
      ? () => {
          filter.setSearch('')
          filter.setVerification(null)
          filter.setState(null)
        }
      : undefined

  return (
    <FilterBox onClear={clear}>
      <Fields>
        <SelectFields>
          <FilterSelect
            title="Verification"
            options={['verified', 'unverified']}
            value={filter.verification}
            onChange={filter.setVerification}
          />
          <FilterSelect title="State" options={['active', 'waiting']} value={filter.state} onChange={filter.setState} />
        </SelectFields>
        <SearchBox label="Search" value={search} onApply={display} onChange={setSearch} />
      </Fields>
    </FilterBox>
  )
}

const SelectFields = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  * {
    width: 184px;
  }
`
const Fields = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`
