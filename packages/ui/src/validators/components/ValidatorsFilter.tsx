import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { FilterBox } from '@/common/components/forms/FilterBox'
import { SearchBox } from '@/common/components/forms/FilterBox/FilterSearchBox'
import { FilterSelect } from '@/common/components/selects'

interface ValidatorFilterProps {
  filter: {
    search: string
    setSearch: (search: string) => void
    isVerified: boolean | undefined
    setIsVerified: (isVerified: boolean | undefined) => void
    isActive: boolean | undefined
    setIsActive: (isActive: boolean | undefined) => void
  }
}

export const ValidatorsFilter = ({ filter }: ValidatorFilterProps) => {
  const [search, setSearch] = useState('')
  useEffect(() => {
    setSearch(filter.search)
  }, [filter.search])
  const display = () => filter.setSearch(search)

  const { isVerified, isActive } = filter
  const verificationValue = isVerified === true ? 'verified' : isVerified === false ? 'unverified' : undefined
  const stateValue = isActive === true ? 'active' : isActive === false ? 'waiting' : undefined

  const clear =
    filter.search || verificationValue || stateValue
      ? () => {
          filter.setSearch('')
          filter.setIsVerified(undefined)
          filter.setIsActive(undefined)
        }
      : undefined

  return (
    <FilterBox onClear={clear}>
      <Fields>
        <SelectFields>
          <FilterSelect
            title="Verification"
            options={['verified', 'unverified']}
            value={verificationValue}
            onChange={(value) => filter.setIsVerified(value === null ? undefined : value === 'verified')}
          />
          <FilterSelect
            title="State"
            options={['active', 'waiting']}
            value={stateValue}
            onChange={(value) => filter.setIsActive(value === null ? undefined : value === 'active')}
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

  @media (max-width: 767px) {
    flex-direction: column;
    * {
      width: 100%;
    }
  }
`
const Fields = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`
