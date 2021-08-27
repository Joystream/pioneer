import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonProps } from '../../common/components/buttons'
import { TransferIcon } from '../../common/components/icons'
import { Colors } from '../../common/constants'
import { useModal } from '../../common/hooks/useModal'
import { TransferInvitesModalCall } from '../modals/TransferInviteModal'
import { Member } from '../types'

interface Props extends Pick<ButtonProps, 'square'> {
  member: Member
  children?: ReactNode
}

export function TransferInviteButton({ member, square, children }: Props) {
  const disabled = member.inviteCount <= 0
  const { showModal } = useModal()
  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    showModal<TransferInvitesModalCall>({ modal: 'TransferInvites', data: { memberId: member.id } })
  }

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
