import React, { ReactNode, useState } from 'react'
import ReactDOM from 'react-dom'

import { ButtonGhost, ButtonProps } from '../../common/components/buttons'
import { UpdateMembershipModal } from '../modals/UpdateMembershipModal'
import { Member } from '../types'

interface Props extends ButtonProps {
  className?: string
  children: ReactNode
  member: Member
}

export const EditMembershipButton = ({ className, children, member }: Props) => {
  const [isOpen, toggleIsOpen] = useState(false)

  return (
    <>
      <ButtonGhost
        size="small"
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation()
          toggleIsOpen(!isOpen)
        }}
        className={className}
        square
      >
        {children}
      </ButtonGhost>
      {isOpen &&
        ReactDOM.createPortal(
          <UpdateMembershipModal onClose={() => toggleIsOpen(!isOpen)} member={member} />,
          document.body
        )}
    </>
  )
}
