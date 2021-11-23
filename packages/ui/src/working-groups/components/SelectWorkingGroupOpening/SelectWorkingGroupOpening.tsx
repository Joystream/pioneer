import React, { useMemo } from 'react'
import styled from 'styled-components'

import { OptionComponent, Select, SelectedOption } from '@/common/components/selects'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { OptionWorkingGroupTitle } from '@/working-groups/components/SelectWorkingGroup/OptionWorkingGroup'
import { OptionsListWorkingGroupOpening } from '@/working-groups/components/SelectWorkingGroupOpening/OptionsListWorkingGroupOpening'
import { OptionWorkingGroupOpening } from '@/working-groups/components/SelectWorkingGroupOpening/OptionWorkingGroupOpening'
import { useOpenings } from '@/working-groups/hooks/useOpenings'
import { WorkingGroup, WorkingGroupOpening } from '@/working-groups/types'

export const filterWorkingGroup = (filterOut: WorkingGroup | undefined) => {
  return filterOut ? (workingGroup: WorkingGroup) => workingGroup.name !== filterOut.name : () => true
}

interface Props {
  onChange: (selected: WorkingGroupOpening) => void
  selectedOpeningId?: string
  groupId?: string
  disabled?: boolean
  className?: string
  id?: string
}

export const SelectWorkingGroupOpeningBase = ({
  id,
  onChange,
  selectedOpeningId,
  disabled,
  className,
  groupId,
}: Props) => {
  const { isLoading, openings } = useOpenings({ type: 'open', groupId })
  console.log(openings, openings)
  const selectedOpening = useMemo(() => openings.find((opening) => opening.id === selectedOpeningId), [
    selectedOpeningId,
    openings.length,
  ])

  const change = (selected: WorkingGroupOpening, close: () => void) => {
    onChange(selected)
    close()
  }

  return (
    <Select
      id={id}
      selected={selectedOpening}
      onChange={change}
      disabled={disabled}
      renderSelected={renderSelected}
      placeholder="Select Working Group or type group name"
      renderList={(onOptionClick) => <OptionsListWorkingGroupOpening allOpenings={openings} onChange={onOptionClick} />}
      className={className}
    />
  )
}

const renderSelected = (opening: WorkingGroupOpening) => (
  <SelectedOption>
    <OptionWorkingGroupOpening opening={opening} />
  </SelectedOption>
)

export const SelectWorkingGroupOpening = styled(SelectWorkingGroupOpeningBase)`
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
