import React from 'react'
import styled from 'styled-components'
import { Account } from '../common/types'
import { Colors } from '../constants'
import { useModal } from '../hooks/useModal'
import { TransferModalCall } from '../modals/TransferModal'
import { ButtonGhost, ButtonPrimary } from './buttons'
import { TransferIconName, TransferIcons } from './icons/TransferIcons'

interface Props {
  from?: Account
  to?: Account
  disabled?: boolean
}

export function TransferButton({ from, to, disabled }: Props) {
  const { showModal } = useModal()
  const isTransfer = !from && !to
  const isSend = !!from && !isTransfer
  const iconName: TransferIconName = isTransfer ? 'TransferIcon' : isSend ? 'SendIcon' : 'ReceiveIcon'
  const icon = TransferIcons[iconName]
  const isDisabled = !!disabled

  return (
    <ButtonForTransfer
      size="medium"
      square
      onClick={() => showModal<TransferModalCall>({ modal: 'TransferTokens', data: { from, to, iconName } })}
      disabled={isDisabled}
    >
      {icon}
    </ButtonForTransfer>
  )
}

export function TransferButtonStyled() {
  const { showModal } = useModal()
  const iconName: TransferIconName = 'TransferIcon'
  const icon = TransferIcons[iconName]

  return (
    <ButtonForTransferStyled
      size="small"
      square
      onClick={() => showModal<TransferModalCall>({ modal: 'TransferTokens', data: { iconName } })}
    >
      {icon}
    </ButtonForTransferStyled>
  )
}

const ButtonForTransfer = styled(ButtonGhost)`
  svg {
    color: ${Colors.Black[900]};
  }
`

const ButtonForTransferStyled = styled(ButtonPrimary)`
  width: 32px;
  height: 32px;
  grid-area: balancetransfer;
  justify-self: end;
`
