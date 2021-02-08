import React, { useState } from 'react'
import styled from 'styled-components'
import { Colors } from '../constants'
import { Account } from '../hooks/types'
import { TransferModal } from '../modals/TransferModal/TransferModal'
import { ButtonGhostMediumSquare, ButtonPrimarySquare } from './buttons'
import { ArrowInsideIcon, ArrowOutsideIcon, TransferIcon } from './icons'

interface Props {
  from?: Account
  to?: Account
}

export function TransferButton({ from, to }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const isTransfer = !from && !to
  const isSend = !!from && !isTransfer
  const icon = isTransfer ? <TransferIcon /> : isSend ? <ArrowOutsideIcon /> : <ArrowInsideIcon />

  return (
    <>
      <ButtonForTransfer onClick={() => setIsOpen(true)}>{icon}</ButtonForTransfer>
      {isOpen && <TransferModal onClose={() => setIsOpen(false)} from={from} to={to} icon={icon} />}
    </>
  )
}

export function TransferButtonStyled() {
  const [isOpen, setIsOpen] = useState(false)
  const icon = <TransferIcon />

  return (
    <>
      <ButtonForTransferStyled onClick={() => setIsOpen(true)}>{icon}</ButtonForTransferStyled>
      {isOpen && <TransferModal onClose={() => setIsOpen(false)} icon={icon} />}
    </>
  )
}

const ButtonForTransfer = styled(ButtonGhostMediumSquare)`
  svg {
    color: ${Colors.Black[900]};
  }
`

const ButtonForTransferStyled = styled(ButtonPrimarySquare)`
  width: 32px;
  height: 32px;
  grid-area: balancetransfer;
`
