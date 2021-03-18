import React from 'react'
import { BaseMember } from '../common/types'
import { useToggle } from '../hooks/useToggle'
import { TransferInviteModal } from '../modals/TransferInviteModal'
import { Button } from './buttons'
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
      <Button variant="secondary" size="small" square disabled={disabled} onClick={toggleOpen}>
        {icon}
      </Button>
      {isOpen && <TransferInviteModal onClose={toggleOpen} icon={icon} member={member} />}
    </>
  )
}
