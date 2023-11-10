import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { Select, SelectedOption } from '@/common/components/selects'
import { TextSmall } from '@/common/components/typography'

import { OptionsPalletFrozenStatus } from './OptionsPalletFrozenStatus'
import { PalletFrozenStatus } from './UpdatePalletFrozenStatus'

interface Props {
  selectedStatus?: boolean
  onChange: (selected: PalletFrozenStatus) => void
}
export const SelectPalletFrozenStatus = ({ selectedStatus, onChange }: Props) => {
  const [, setSearch] = useState('')
  const selected = useMemo(() => {
    if (selectedStatus === true) {
      return 'Enabled'
    }
    if (selectedStatus === false) {
      return 'Disabled'
    }
    return selectedStatus
  }, [selectedStatus])
  const change = (selected: PalletFrozenStatus, close: () => void) => {
    onChange(selected)
    close()
  }
  return (
    <Select
      id="crt-feature-select"
      selected={selected}
      placeholder="Choose your option"
      onChange={change}
      onSearch={(search) => setSearch(search)}
      renderSelected={renderSelected}
      renderList={(onOptionClick) => <OptionsPalletFrozenStatus onChange={onOptionClick} />}
    />
  )
}
const renderSelected = (selected: PalletFrozenStatus) => {
  return (
    <SelectedOption>
      <OptionPalletFrozenStatus>
        <TextSmall>{selected}</TextSmall>
      </OptionPalletFrozenStatus>
    </SelectedOption>
  )
}
const OptionPalletFrozenStatus = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
`
