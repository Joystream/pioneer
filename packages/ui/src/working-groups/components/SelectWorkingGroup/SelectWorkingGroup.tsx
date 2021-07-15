import React, { useMemo, useState } from 'react'

import { Select, SelectedOption } from '@/common/components/selects'
import { OptionWorkingGroup } from '@/working-groups/components/SelectWorkingGroup/OptionWorkingGroup'
import { useWorkingGroups } from '@/working-groups/hooks/useWorkingGroups'
import { WorkingGroup } from '@/working-groups/types'

import { OptionsListWorkingGroup } from './OptionsListWorkingGroup'

export const filterWorkingGroup = (filterOut: WorkingGroup | undefined) => {
  return filterOut ? (workingGroup: WorkingGroup) => workingGroup.name !== filterOut.name : () => true
}

const filterByText = (options: WorkingGroup[], text: string) => {
  if (!text.length) {
    return options
  }

  const searchBy = text.toLocaleLowerCase()
  return options.filter(({ name }) => name?.toLocaleLowerCase().includes(searchBy))
}

interface Props {
  onChange: (selected: WorkingGroup) => void
  filter?: (option: WorkingGroup) => boolean
  selected?: WorkingGroup
  disabled?: boolean
}

export const SelectWorkingGroup = ({ onChange, filter, selected, disabled }: Props) => {
  const baseFilter = filter || (() => true)
  const [search, setSearch] = useState('')

  const { isLoading, groups } = useWorkingGroups()

  const filteredFoundWorkingGroups = useMemo(() => filterByText(groups.filter(baseFilter), search), [
    search,
    groups.length,
    isLoading,
  ])

  const change = (selected: WorkingGroup, close: () => void) => {
    onChange(selected)
    close()
  }

  return (
    <Select
      selected={selected}
      onChange={change}
      disabled={disabled}
      renderSelected={renderSelected}
      placeholder="Select Working Group or type group name"
      renderList={(onOptionClick) => (
        <OptionsListWorkingGroup allWorkingGroups={filteredFoundWorkingGroups} onChange={onOptionClick} />
      )}
      onSearch={(search) => setSearch(search)}
    />
  )
}

const renderSelected = (group: WorkingGroup) => (
  <SelectedOption>
    <OptionWorkingGroup group={group} />
  </SelectedOption>
)
