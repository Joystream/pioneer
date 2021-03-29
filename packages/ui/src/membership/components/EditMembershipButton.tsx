import React, { ReactNode } from 'react'
import { BaseMember } from '../../common/types'
import { ButtonGhost, ButtonProps } from '../../components/buttons'
import { useToggle } from '../../hooks/useToggle'
import { UpdateMembershipModal } from '../../modals/UpdateMembershipModal'

interface Props extends ButtonProps {
  className?: string
  children: ReactNode
  member: BaseMember
}

export const EditMembershipButton = ({ className, children, size, member }: Props) => {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <ButtonGhost size={size} onClick={toggleIsOpen} className={className}>
        {children}
      </ButtonGhost>
      {isOpen && <UpdateMembershipModal onClose={toggleIsOpen} member={member} />}
    </>
  )
}
