import React from 'react'
import { useToggle } from '../hooks/useToggle'
import { MemberFieldsFragment } from '../api/queries'
import { ButtonSecondarySmallSquare } from './buttons'
import { TransferIcon } from './icons'
import { TransferInviteModal } from '../modals/TransferInviteModal'

interface Props {
  member: MemberFieldsFragment
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
