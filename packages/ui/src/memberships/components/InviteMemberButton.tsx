import React, { ReactNode } from 'react'

import { ButtonGhost, ButtonSize } from '../../common/components/buttons'
import { useToggle } from '../../common/hooks/useToggle'
import { InviteMemberModal } from '../modals/InviteMemberModal'

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
