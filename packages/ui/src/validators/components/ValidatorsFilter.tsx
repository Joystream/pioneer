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
    isVerified: Verification
    setIsVerified: (isVerified: Verification) => void
    isActive: State
    setIsActive: (isActive: State) => void
  }
}

export const ValidatorsFilter = ({ filter }: ValidatorFilterProps) => {
  const [search, setSearch] = useState('')
  useEffect(() => {
    setSearch(filter.search)
  }, [filter.search])
  const display = () => filter.setSearch(search)
  const clear =
    filter.search || filter.isVerified || filter.isActive
      ? () => {
          filter.setSearch('')
          filter.setIsVerified(null)
          filter.setIsActive(null)
        }
      : undefined

  return (
    <FilterBox onClear={clear}>
      <Fields>
        <SelectFields>
          <FilterSelect
            title="Verification"
            options={['verified', 'unverified']}
            value={filter.isVerified}
            onChange={filter.setIsVerified}
          />
          <FilterSelect
            title="State"
            options={['active', 'waiting']}
            value={filter.isActive}
            onChange={filter.setIsActive}
          />
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
