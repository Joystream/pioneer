import React, { ChangeEvent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { InputComponent, InputText } from '@/common/components/forms'
import { SearchIcon } from '@/common/components/icons'

import { ControlProps } from '../types'
import { FilterLabel } from './FilterLabel'
import { Colors } from '@/common/constants'

interface FilterSearchBoxProps extends SearchBoxProps {
  slot: React.RefObject<HTMLDivElement>
  label?: string
}
export const FilterSearchBox = React.memo(({ value, slot, onApply, onChange, label }: FilterSearchBoxProps) => {
  // Force the search box to render (sometime the ref is null on the first render)
  const [rendered, setRendered] = useState(!!slot.current)
  useEffect(() => {
    !rendered && setRendered(true)
  }, [])

  return slot.current && createPortal(<SearchBox value={value} onApply={onApply} onChange={onChange} label={label} />, slot.current)
})

interface SearchBoxProps extends ControlProps<string> {
  onApply?: () => void
  label?: string
}
export const SearchBox = React.memo(({ value, onApply, onChange, label }: SearchBoxProps) => {
  const change = onChange && (({ target }: ChangeEvent<HTMLInputElement>) => onChange(target.value))
  const keyDown = onApply && (({ key }: React.KeyboardEvent) => key === 'Enter' && onApply())
  return (
    <SearchBoxWrapper>
      <FilterLabel>{label}</FilterLabel>
      <SearchInput inputSize={!!label ? 'xs' : 's'}>
        <InputText placeholder="Search" value={value} onChange={change} onKeyDown={keyDown} />
      </SearchInput>
    </SearchBoxWrapper>
  )
})

const SearchBoxWrapper = styled.div`
  &:hover,
  &:focus,
  &:focus-within,
  &:active {
    ${FilterLabel} {
      color: ${Colors.Blue[400]};
    }
  }
`

const SearchInput = styled(InputComponent).attrs({
  icon: <SearchIcon />,
  tight: true,
  inputWidth: 'xs',
})`
`
