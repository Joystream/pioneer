import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'

import { ButtonProps } from '../../common/components/buttons'
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
  const { showModal } = useModal()
  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    showModal<TransferInvitesModalCall>({ modal: 'TransferInvites', data: { memberId: member.id } })
  }
  const { isTransactionPending } = useTransactionStatus()
  const disabled = isTransactionPending || member.inviteCount <= 0

  return (
    <TransactionButton style="ghost" size="small" square={square ?? true} disabled={disabled} onClick={onClick}>
      {children ? children : <TransferIconAlt />}
    </TransactionButton>
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
