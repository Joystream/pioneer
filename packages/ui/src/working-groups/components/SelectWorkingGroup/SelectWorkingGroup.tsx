import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { OptionComponent, Select, SelectedOption } from '@/common/components/selects'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { nameMapping } from '@/common/helpers'
import {
  OptionWorkingGroup,
  OptionWorkingGroupTitle,
} from '@/working-groups/components/SelectWorkingGroup/OptionWorkingGroup'
import { useWorkingGroups } from '@/working-groups/hooks/useWorkingGroups'
import { GroupIdName, WorkingGroup } from '@/working-groups/types'

import { OptionsListWorkingGroup } from './OptionsListWorkingGroup'

export const filterWorkingGroup = (filterOut: WorkingGroup | undefined) => {
  return filterOut ? (workingGroup: WorkingGroup) => workingGroup.name !== filterOut.name : () => true
}

const filterByText = (options: WorkingGroup[], text: string) => {
  if (!text.length) {
    return options
  }

  const searchBy = text.toLocaleLowerCase()
  return options.filter(({ name }) => nameMapping(name)?.toLocaleLowerCase().includes(searchBy))
}

interface Props {
  onChange: (selected: WorkingGroup) => void
  selectedGroupId?: GroupIdName
  disabled?: boolean
  className?: string
  disableNoLead?: boolean
  id?: string
}

export const SelectWorkingGroupBase = ({
  id,
  onChange,
  selectedGroupId,
  disabled,
  className,
  disableNoLead,
}: Props) => {
  const [search, setSearch] = useState('')
  const { isLoading, groups } = useWorkingGroups()
  const selectedGroup = useMemo(
    () => groups.find((group) => group.id === selectedGroupId),
    [selectedGroupId, groups.length]
  )
  const filteredFoundWorkingGroups = useMemo(() => filterByText(groups, search), [search, groups.length, isLoading])

  const change = (selected: WorkingGroup, close: () => void) => {
    onChange(selected)
    close()
  }

  return (
    <Select
      id={id}
      selected={selectedGroup}
      onChange={change}
      disabled={disabled}
      renderSelected={renderSelected}
      placeholder="Select Working Group or type group name"
      renderList={(onOptionClick) => (
        <OptionsListWorkingGroup
          allWorkingGroups={filteredFoundWorkingGroups}
          disableNoLead={disableNoLead}
          onChange={onOptionClick}
        />
      )}
      onSearch={(search) => setSearch(search)}
      className={className}
    />
  )
}

const renderSelected = (group: WorkingGroup) => (
  <SelectedOption>
    <OptionWorkingGroup group={group} />
  </SelectedOption>
)

export const SelectWorkingGroup = styled(SelectWorkingGroupBase)`
  ${SelectedOption} {
    grid-template-columns: 1fr;
  }
  ${OptionComponent} {
    grid-template-columns: 1fr;
    padding: 10px 16px;

    &:hover,
    &:focus,
    &:focus-within {
      ${OptionWorkingGroupTitle} {
        color: ${Colors.Blue[500]};
      }
    }
    &:active {
      ${OptionWorkingGroupTitle} {
        color: ${Colors.Blue[600]};
      }
    }
    &:disabled {
      cursor: not-allowed;
      background-color: ${Colors.Black[50]};
      z-index: 0;

      ${OptionWorkingGroupTitle} {
        color: ${Colors.Black[500]};
      }
      ${TextMedium} {
        color: ${Colors.Black[400]};
      }
    }
  }
`
