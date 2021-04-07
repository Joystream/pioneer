import React from 'react'
import styled from 'styled-components'

import { TransferModalCall } from '../../accounts/modals/TransferModal'
import { Colors } from '../../app/constants'
import { useModal } from '../hooks/useModal'
import { Account } from '../types'
import { ButtonGhost, ButtonPrimary } from './buttons'
import { TransferType, PickedTransferIcon } from './icons/TransferIcons'

interface Props {
  from?: Account
  to?: Account
  disabled?: boolean
}

export function TransferButton({ from, to, disabled }: Props) {
  const { showModal } = useModal()
  const isTransfer = !from && !to
  const isSend = !!from && !isTransfer
  const iconType: TransferType = isTransfer ? 'transfer' : isSend ? 'send' : 'receive'
  const isDisabled = !!disabled

  return (
    <ButtonForTransfer
      size="medium"
      square
      onClick={() => showModal<TransferModalCall>({ modal: 'TransferTokens', data: { from, to } })}
      disabled={isDisabled}
    >
      <PickedTransferIcon type={iconType} />
    </ButtonForTransfer>
  )
}

export function TransferButtonStyled() {
  const { showModal } = useModal()
  const iconType = 'transfer'

  return (
    <ButtonForTransferStyled
      size="small"
      square
      onClick={() => showModal<TransferModalCall>({ modal: 'TransferTokens', data: {} })}
    >
      <PickedTransferIcon type={iconType} />
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
