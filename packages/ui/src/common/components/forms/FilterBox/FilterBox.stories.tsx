import { Meta, Story } from '@storybook/react'
import React, { useRef, useState } from 'react'

import { FilterSelect } from '@/common/components/selects'

import { FilterBox, FilterPageHeader } from '.'

export default {
  title: 'Common/Forms/FilterBox',
  component: FilterBox,
} as Meta

export const Default: Story = () => {
  const searchSlot = useRef<HTMLDivElement>(null)

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
    <>
      <FilterPageHeader ref={searchSlot} title="Filter Box" />
      <FilterBox searchSlot={searchSlot} search={search} onApply={display} onClear={clear} onSearch={setSearch}>
        <FilterSelect title="Select" options={['foo', 'bar']} value={selectValue} onChange={setSelectValue} />
      </FilterBox>
    </>
  )
}
Default.args = {}
