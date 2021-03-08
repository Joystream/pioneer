import React from 'react'
import { MemberFieldsFragment } from '../api/queries'
import { ButtonSecondarySmallSquare } from './buttons'
import { TransferIcon } from './icons'

interface Props {
  member: MemberFieldsFragment
}

export function TransferInviteButton({ member }: Props) {
  const disabled = member.inviteCount <= 0

  return (
    <ButtonSecondarySmallSquare disabled={disabled}>
      <TransferIcon />
    </ButtonSecondarySmallSquare>
  )
}
