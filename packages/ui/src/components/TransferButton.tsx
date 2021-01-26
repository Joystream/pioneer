import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonGhostMediumSquare } from './buttons/Buttons'
import { Colors } from '../constants'
import { Account } from '../hooks/types'
import { ArrowOutsideIcon } from './icons/ArrowOutsideIcon'
import { TransferModal } from './TransferModal'

interface Props {
  from: Account
  to: Account
}

export function TransferButton({ from, to }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ButtonForTransfer onClick={() => setIsOpen(true)}>
        <ArrowOutsideIcon />
      </ButtonForTransfer>
      {isOpen && <TransferModal onClose={() => setIsOpen(false)} from={from} to={to} />}
    </>
  )
}

const ButtonForTransfer = styled(ButtonGhostMediumSquare)`
  svg {
    color: ${Colors.Black[900]};
  }
`
