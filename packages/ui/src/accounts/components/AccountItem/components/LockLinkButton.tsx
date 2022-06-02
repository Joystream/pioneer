import React from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { Arrow } from '@/common/components/icons'

interface LockLinkButtonProps {
  label: string
  to?: string
  onClick?: () => void
}

export const LockLinkButton = React.memo(({ label, to, onClick }: LockLinkButtonProps) => {
  return to ? (
    <LinkButtonGhost size="medium" to={to}>
      {label}
      <Arrow direction="right" />
    </LinkButtonGhost>
  ) : (
    <ButtonGhost size="medium" onClick={onClick}>
      {label}
      <Arrow direction="right" />
    </ButtonGhost>
  )
})
