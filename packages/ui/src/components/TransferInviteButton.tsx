import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { BaseMember } from '../common/types'
import { Colors } from '../constants'
import { useModal } from '../hooks/useModal'
import { TransferInvitesModalCall } from '../modals/TransferInviteModal'
import { ButtonGhost, ButtonProps } from './buttons'
import { TransferIcon } from './icons'

interface Props extends Pick<ButtonProps, 'square'> {
  member: BaseMember
  children?: ReactNode
}

export function TransferInviteButton({ member, square, children }: Props) {
  const disabled = member.inviteCount <= 0
  const { showModal } = useModal()
  const onClick = () => showModal<TransferInvitesModalCall>({ modal: 'TransferInvites', data: { memberId: member.id } })

  return (
    <ButtonGhost size="small" square={square ?? true} disabled={disabled} onClick={onClick}>
      {children ? children : <TransferIconAlt />}
    </ButtonGhost>
  )
}

const TransferIconAlt = styled(TransferIcon)`
  & > .blackPart {
    fill: ${Colors.Black[900]};
  }
  & > .primaryPart {
    fill: ${Colors.Blue[500]};
  }
`
