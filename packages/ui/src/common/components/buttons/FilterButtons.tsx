import React, { MouseEventHandler } from 'react'

import { ButtonGhost, ButtonPrimary } from '@/common/components/buttons'
import { stopEvent } from '@/common/utils/events'

interface FilterButtonsProps {
  onClear?: () => void
  onApply?: () => void
}
export const FilterButtons = ({ onClear, onApply }: FilterButtonsProps) => {
  const apply: MouseEventHandler<Element> = (evt) => {
    stopEvent(evt)
    onApply?.()
  }
  const clear: MouseEventHandler<Element> = (evt) => {
    stopEvent(evt)
    onClear?.()
  }
  return (
    <>
      <ButtonGhost onClick={clear} size="medium">
        Clear Filter
      </ButtonGhost>
      <ButtonPrimary onClick={apply} size="medium">
        Apply Filter
      </ButtonPrimary>
    </>
  )
}
