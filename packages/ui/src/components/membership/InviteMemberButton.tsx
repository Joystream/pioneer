import React, { ReactNode } from 'react'
import { useToggle } from '../../hooks/useToggle'
import { InviteMemberModal } from '../../modals/InviteMemberModal'
import { Button, ButtonSize } from '../buttons'

interface InviteMemberButtonProps {
  className?: string
  children: ReactNode
  size?: ButtonSize
}

export const InviteMemberButton = ({ className, children, size }: InviteMemberButtonProps) => {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <Button variant="ghost" size={size} onClick={toggleIsOpen} className={className}>
        {children}
      </Button>
      {isOpen && <InviteMemberModal onClose={toggleIsOpen} />}
    </>
  )
}
