import React, { useState } from 'react'
import styled from 'styled-components'
import { Colors } from '../constants'
import { Account } from '../hooks/types'
import { ButtonGhostMediumSquare } from './buttons/Buttons'
import { ArrowInsideIcon } from './icons/ArrowInsideIcon'
import { ArrowOutsideIcon } from './icons/ArrowOutsideIcon'
import { TransferModal } from '../modals/TransferModal/TransferModal'
import { TransferIcon } from './icons/TransferIcon'

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

const ButtonForTransfer = styled(ButtonGhostMediumSquare)`
  svg {
    color: ${Colors.Black[900]};
  }
`
