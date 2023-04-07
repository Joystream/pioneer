import React, { useMemo } from 'react'
import styled from 'styled-components'

import { Select, SelectedOption } from '@/common/components/selects'
import { OptionsListWorkingGroupOpening } from '@/working-groups/components/SelectWorkingGroupOpening/OptionsListWorkingGroupOpening'
import { OptionWorkingGroupOpening } from '@/working-groups/components/SelectWorkingGroupOpening/OptionWorkingGroupOpening'
import { useOpenings } from '@/working-groups/hooks/useOpenings'
import { OpeningPositionType } from '@/working-groups/hooks/utils/queries'
import { WorkingGroup, WorkingGroupOpening } from '@/working-groups/types'

export const filterWorkingGroup = (filterOut: WorkingGroup | undefined) => {
  return filterOut ? (workingGroup: WorkingGroup) => workingGroup.name !== filterOut.name : () => true
}

interface Props {
  onChange: (selected: WorkingGroupOpening) => void
  placeholder: string
  selectedOpeningId?: string
  groupId?: string
  disabled?: boolean
  className?: string
  id?: string
  openingsPositionType?: OpeningPositionType
}

export const SelectWorkingGroupOpeningBase = ({
  id,
  onChange,
  placeholder,
  selectedOpeningId,
  disabled,
  className,
  groupId,
  openingsPositionType,
}: Props) => {
  const { openings } = useOpenings({ type: 'open', groupId, openingsPositionType })
  const selectedOpening = useMemo(
    () => openings.find((opening) => opening.id === selectedOpeningId),
    [selectedOpeningId, openings.length]
  )

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
      placeholder={placeholder}
      renderList={(onOptionClick) => <OptionsListWorkingGroupOpening allOpenings={openings} onChange={onOptionClick} />}
      className={className}
      onSearch={() => undefined}
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
    grid-template-columns: 1fr !important;
  }
`
