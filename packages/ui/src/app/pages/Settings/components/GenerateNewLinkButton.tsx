import React from 'react'

import { ButtonGhost } from '@/common/components/buttons/Buttons'
import { TextMedium } from '@/common/components/typography'

export const GenerateNewLinkButton = () => {
  const generateNewLink = () => {alert("Generate new link")}
  return (
    <ButtonGhost size="small" onClick={generateNewLink}>
      <TextMedium>Generate new link</TextMedium>
    </ButtonGhost>
  )
}
