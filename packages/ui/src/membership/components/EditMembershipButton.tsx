import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { BaseMember } from '../../common/types'
import { Button, ButtonSize, ButtonVariant } from '../../components/buttons'
import { useToggle } from '../../hooks/useToggle'
import { UpdateMembershipModal } from '../../modals/UpdateMembershipModal'

interface Props {
  className?: string
  children: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
  member: BaseMember
}

export const EditMembershipButton = ({ className, children, size, member, variant }: Props) => {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <EditMembership size={size} variant={variant} onClick={toggleIsOpen} className={className}>
        {children}
      </EditMembership>
      {isOpen && <UpdateMembershipModal onClose={toggleIsOpen} member={member} />}
    </>
  )
}

const EditMembership = styled(Button)`
  justify-self: center;
  align-self: center;
`
