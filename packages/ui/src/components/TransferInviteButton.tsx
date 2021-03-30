import React from 'react'
import { BaseMember } from '../common/types'
import { useModal } from '../hooks/useModal'
import { ButtonSecondary } from './buttons'
import { TransferIcon } from './icons'

interface Props {
  member: BaseMember
}

export function TransferInviteButton({ member }: Props) {
  const disabled = member.inviteCount <= 0
  const { showModal } = useModal()
  const onClick = () => showModal('TransferInvites', { memberId: member.id })

  return (
    <>
      <ButtonSecondary size="small" square disabled={disabled} onClick={onClick}>
        <TransferIcon />
      </ButtonSecondary>
    </>
  )
}
