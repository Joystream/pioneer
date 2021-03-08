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

  return (
    <>
      <ButtonSecondarySmallSquare disabled={disabled} onClick={toggleOpen}>
        <TransferIcon />
      </ButtonSecondarySmallSquare>
      {isOpen && <TransferInviteModal onClose={toggleOpen} />}
    </>
  )
}
