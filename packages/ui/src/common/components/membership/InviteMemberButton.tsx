import React, { ReactNode } from 'react'

import { InviteMemberModal } from '../../../membership/modals/InviteMemberModal'
import { useToggle } from '../../hooks/useToggle'
import { ButtonGhost, ButtonSize } from '../buttons'

interface InviteMemberButtonProps {
  className?: string
  children: ReactNode
  size?: ButtonSize
}

export const InviteMemberButton = ({ className, children, size }: InviteMemberButtonProps) => {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <ButtonGhost size={size} onClick={toggleIsOpen} className={className}>
        {children}
      </ButtonGhost>
      {isOpen && <InviteMemberModal onClose={toggleIsOpen} />}
    </>
  )
}
