import React, { ChangeEvent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { InputComponent, InputText } from '@/common/components/forms'
import { SearchIcon } from '@/common/components/icons'

import { ControlProps } from '../types'

interface FilterSearchBoxProps extends SearchBoxProps {
  slot: React.RefObject<HTMLDivElement>
}
export const FilterSearchBox = React.memo(({ value, slot, onApply, onChange }: FilterSearchBoxProps) => {
  // Force the search box to render (sometime the ref is null on the first render)
  const [rendered, setRendered] = useState(!!slot.current)
  useEffect(() => {
    !rendered && setRendered(true)
  }, [])

  return slot.current && createPortal(<SearchBox value={value} onApply={onApply} onChange={onChange} />, slot.current)
})

interface SearchBoxProps extends ControlProps<string> {
  onApply?: () => void
}
export const SearchBox = React.memo(({ value, onApply, onChange }: SearchBoxProps) => {
  const change = onChange && (({ target }: ChangeEvent<HTMLInputElement>) => onChange(target.value))
  const keyDown = onApply && (({ key }: React.KeyboardEvent) => key === 'Enter' && onApply())
  return (
    <SearchInput>
      <InputText placeholder="Search" value={value} onChange={change} onKeyDown={keyDown} />
    </SearchInput>
  )
})

const SearchInput = styled(InputComponent).attrs({
  icon: <SearchIcon />,
  tight: true,
  inputSize: 's',
  inputWidth: 'xs',
})`
  width: 240px;
`
