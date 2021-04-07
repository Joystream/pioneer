import React, { ReactNode } from 'react'

import { ButtonGhost, ButtonProps } from '../../common/components/buttons'
import { useToggle } from '../../common/hooks/useToggle'
import { UpdateMembershipModal } from '../modals/UpdateMembershipModal'
import { BaseMember } from '../types'

interface Props extends ButtonProps {
  className?: string
  children: ReactNode
  member: BaseMember
}

export const EditMembershipButton = ({ className, children, member }: Props) => {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <ButtonGhost size="small" onClick={toggleIsOpen} className={className} square>
        {children}
      </ButtonGhost>
      {isOpen && <UpdateMembershipModal onClose={toggleIsOpen} member={member} />}
    </>
  )
}
