import React from 'react'
import { BaseMember } from '../common/types'
import { useToggle } from '../hooks/useToggle'
import { TransferInviteModal } from '../modals/TransferInviteModal'
import { ButtonSecondarySmallSquare } from './buttons'
import { TransferIcon } from './icons'

interface Props {
  member: BaseMember
}

export function TransferInviteButton({ member }: Props) {
  const disabled = member.inviteCount <= 0
  const [isOpen, toggleOpen] = useToggle()
  const icon = <TransferIcon />

  return (
    <>
      <ButtonSecondarySmallSquare disabled={disabled} onClick={toggleOpen}>
        {icon}
      </ButtonSecondarySmallSquare>
      {isOpen && <TransferInviteModal onClose={toggleOpen} icon={icon} member={member} />}
    </>
  )
}
