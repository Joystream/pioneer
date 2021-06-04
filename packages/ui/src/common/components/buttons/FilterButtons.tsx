import React from 'react'

import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'

interface FilterButtonsProps {
  onClear?: () => void
  onApply?: () => void
}
export const FilterButtons = ({ onClear, onApply }: FilterButtonsProps) => (
  <ButtonsGroup align="right">
    <ButtonGhost onClick={onClear} size="medium">
      Clear Filter
    </ButtonGhost>
    <ButtonPrimary onClick={onApply} size="medium">
      Apply Filter
    </ButtonPrimary>
  </ButtonsGroup>
)
