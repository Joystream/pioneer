import React from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonPrimary } from '../../common/components/buttons'
import { TransferType, PickedTransferIcon } from '../../common/components/icons/TransferIcons'
import { Colors } from '../../common/constants'
import { useModal } from '../../common/hooks/useModal'
import { TransferModalCall } from '../modals/TransferModal'
import { Account } from '../types'

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
      size="small"
      square
      onClick={(event) => {
        event.stopPropagation()
        showModal<TransferModalCall>({ modal: 'TransferTokens', data: { from, to } })
      }}
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
      onClick={(event) => {
        event.stopPropagation()
        showModal<TransferModalCall>({ modal: 'TransferTokens', data: {} })
      }}
    >
      <PickedTransferIcon type={iconType} />
    </ButtonForTransferStyled>
  )
}

const ButtonForTransfer = styled(ButtonGhost)`
  z-index: 1;
  svg {
    color: ${Colors.Black[900]};
  }
`

const ButtonForTransferStyled = styled(ButtonPrimary)`
  width: 32px;
  height: 32px;
  grid-area: balancetransfer;
  justify-self: end;
  z-index: 1;
`
