import React from 'react'
import styled from 'styled-components'
import { Account } from '../common/types'
import { Colors } from '../constants'
import { useToggle } from '../hooks/useToggle'
import { TransferModal } from '../modals/TransferModal/TransferModal'
import { ButtonGhostMediumSquare, ButtonPrimarySmallSquare } from './buttons'
import { ArrowInsideIcon, ArrowOutsideIcon, TransferIcon } from './icons'

interface Props {
  from?: Account
  to?: Account
  disabled?: boolean
}

export function TransferButton({ from, to, disabled }: Props) {
  const [isOpen, toggleOpen] = useToggle()
  const isTransfer = !from && !to
  const isSend = !!from && !isTransfer
  const icon = isTransfer ? <TransferIcon /> : isSend ? <ArrowOutsideIcon /> : <ArrowInsideIcon />
  const isDisabled = !!disabled

  return (
    <>
      <ButtonForTransfer onClick={toggleOpen} disabled={isDisabled}>
        {icon}
      </ButtonForTransfer>
      {isOpen && <TransferModal onClose={toggleOpen} from={from} to={to} icon={icon} />}
    </>
  )
}

export function TransferButtonStyled() {
  const [isOpen, toggleOpen] = useToggle()
  const icon = <TransferIcon />

  return (
    <>
      <ButtonForTransferStyled onClick={toggleOpen}>{icon}</ButtonForTransferStyled>
      {isOpen && <TransferModal onClose={toggleOpen} icon={icon} />}
    </>
  )
}

const ButtonForTransfer = styled(ButtonGhostMediumSquare)`
  svg {
    color: ${Colors.Black[900]};
  }
`

const ButtonForTransferStyled = styled(ButtonPrimarySmallSquare)`
  width: 32px;
  height: 32px;
  grid-area: balancetransfer;
  justify-self: end;
`
