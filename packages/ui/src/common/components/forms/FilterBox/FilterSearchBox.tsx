import React, { ChangeEvent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { InputComponent, InputText } from '@/common/components/forms'
import { SearchIcon } from '@/common/components/icons'

interface SearchBarProps {
  slot: React.RefObject<HTMLDivElement>
  value?: string
  onApply?: () => void
  onChange?: (value: string) => void
}

export const FilterSearchBox = React.memo(({ value, slot, onApply, onChange }: SearchBarProps) => {
  const change = onChange && (({ target }: ChangeEvent<HTMLInputElement>) => onChange(target.value))
  const keyDown = onApply && (({ key }: React.KeyboardEvent) => key === 'Enter' && onApply())

  // Force the search box to render (sometime the ref is null on the first render)
  const [rendered, setRendered] = useState(!!slot.current)
  useEffect(() => {
    !rendered && setRendered(true)
  }, [])

  return (
    slot.current &&
    createPortal(
      <InputComponent icon={<SearchIcon />} tight inputWidth="xs">
        <InputText placeholder="Search" value={value} onChange={change} onKeyDown={keyDown} />
      </InputComponent>,
      slot.current
    )
  )
})
