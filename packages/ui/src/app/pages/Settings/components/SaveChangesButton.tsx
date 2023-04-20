import React, { MouseEventHandler } from 'react'

import { ButtonPrimary } from '@/common/components/buttons/Buttons'
import { SaveSymbol } from './SaveSymbol'

const saveChanges = () => {
  alert('All changes are saved successfully') //Here SaveFunctions comes
}
interface SaveChangesButtonProps {
  disabled?: boolean
}
export const SaveChangesButton = ({ disabled = true }: SaveChangesButtonProps) => {
  return (
    <ButtonPrimary size="large" onClick={saveChanges} disabled={disabled}>
      <SaveSymbol />
      Save Changes
    </ButtonPrimary>
  )
}
