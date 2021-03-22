import React, { ReactNode } from 'react'
import { BaseMember } from '../../common/types'
import { Button, ButtonProps } from '../../components/buttons'
import { useToggle } from '../../hooks/useToggle'
import { UpdateMembershipModal } from '../../modals/UpdateMembershipModal'

interface Props extends ButtonProps {
  className?: string
  children: ReactNode
  member: BaseMember
}

export const EditMembershipButton = ({ className, children, size, member, variant }: Props) => {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <Button size={size} variant={variant} onClick={toggleIsOpen} className={className}>
        {children}
      </Button>
      {isOpen && <UpdateMembershipModal onClose={toggleIsOpen} member={member} />}
    </>
  )
}
