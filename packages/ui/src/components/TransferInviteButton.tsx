import React, { ReactNode } from 'react'
import { BaseMember } from '../common/types'
import { useModal } from '../hooks/useModal'
import { ButtonProps, ButtonSecondary } from './buttons'
import { TransferIcon } from './icons'

interface Props extends Pick<ButtonProps, 'square'> {
  member: BaseMember
  children?: ReactNode
}

export function TransferInviteButton({ member, square, children }: Props) {
  const disabled = member.inviteCount <= 0
  const { showModal } = useModal()
  const onClick = () => showModal('TransferInvites', { memberId: member.id })

  return (
    <ButtonSecondary size="small" square={square ?? true} disabled={disabled} onClick={onClick}>
      {children ? children : <TransferIcon />}
    </ButtonSecondary>
  )
}
