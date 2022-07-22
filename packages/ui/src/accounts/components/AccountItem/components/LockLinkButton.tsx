import React from 'react'

import { Arrow } from '@/common/components/icons'

import { LockInternalLinkButton, LockExternalLinkButton } from './styles'

interface LockLinkButtonProps {
  label: string
  to?: string
  onClick?: () => void
}

export const LockLinkButton = React.memo(({ label, to, onClick }: LockLinkButtonProps) => {
  return to ? (
    <LockInternalLinkButton size="medium" to={to}>
      {label}
      <Arrow direction="right" />
    </LockInternalLinkButton>
  ) : (
    <LockExternalLinkButton size="medium" onClick={onClick}>
      {label}
      <Arrow direction="right" />
    </LockExternalLinkButton>
  )
})
