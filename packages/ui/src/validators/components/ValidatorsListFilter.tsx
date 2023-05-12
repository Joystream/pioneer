import React, { useState } from 'react'
import styled from 'styled-components'

import { FilterBox } from '@/common/components/forms/FilterBox'
import { FilterSelect } from '@/common/components/selects'
import { SearchBox } from '@/common/components/forms/FilterBox/FilterSearchBox'

export const ValidatorsListFilter = () => {
  const [search, setSearch] = useState('')
  const [selectValue, setSelectValue] = useState<null | 'foo' | 'bar'>(null)

  const display = () => alert(JSON.stringify({ search, selectValue }, null, 2))
  const clear =
    search || selectValue
      ? () => {
          setSearch('')
          setSelectValue(null)
        }
      : undefined

  return (
    <FilterBox onClear={clear}>
      <Fields>
        <SelectFields>
          <FilterSelect title="Verification" options={['foo', 'bar']} value={selectValue} onChange={setSelectValue} />
          <FilterSelect title="State" options={['foo', 'bar']} value={selectValue} onChange={setSelectValue} />
          <FilterSelect title="Health" options={['foo', 'bar']} value={selectValue} onChange={setSelectValue} />
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
