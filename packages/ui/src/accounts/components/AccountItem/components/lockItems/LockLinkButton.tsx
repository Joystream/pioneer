import React from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'

interface LockLinkButtonProps {
  label: string
  onClick: () => void
}

export const LockLinkButton = React.memo(({ label, onClick }: LockLinkButtonProps) => {
  return (
    <ButtonGhost size="medium" onClick={onClick}>
      {label}
      <Arrow direction="right" />
    </ButtonGhost>
  )
})
