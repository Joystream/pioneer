import React, { MouseEventHandler } from 'react'

import { ButtonPrimary } from '@/common/components/buttons/Buttons'
import { SaveSymbol } from '../../../../common/components/icons/symbols/SaveSymbol'

interface SaveChangesButtonProps {
  disabled?: boolean
  saveChanges:MouseEventHandler
}
export const SaveChangesButton = ({ disabled = true, saveChanges }: SaveChangesButtonProps) => {
  return (
    <ButtonPrimary size="large" onClick={saveChanges} disabled={disabled}>
      <SaveSymbol />
      Save Changes
    </ButtonPrimary>
  )
}
