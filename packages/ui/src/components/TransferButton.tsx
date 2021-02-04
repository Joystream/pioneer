import React, { useState } from 'react'
import styled from 'styled-components'
import { Colors } from '../constants'
import { Account } from '../hooks/types'
import { ButtonGhostMediumSquare } from './buttons/Buttons'
import { ArrowInsideIcon } from './icons/ArrowInsideIcon'
import { ArrowOutsideIcon } from './icons/ArrowOutsideIcon'
import { TransferModal } from '../modals/TransferModal/TransferModal'

interface Props {
  from?: Account
  to?: Account
}

export function TransferButton({ from, to }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const isFrom = from && !to

  return (
    <>
      <ButtonForTransfer onClick={() => setIsOpen(true)}>
        {isFrom ? <ArrowInsideIcon /> : <ArrowOutsideIcon />}
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
