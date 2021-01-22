import { BN_TEN } from '@polkadot/util'
import BN from 'bn.js'
import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonGhostMediumSquare } from '../components/buttons/Buttons'
import { Colors } from '../constants'
import { Account } from '../hooks/types'
import { useApi } from '../hooks/useApi'
import { useKeyring } from '../hooks/useKeyring'
import { ButtonGhostMedium } from './buttons/Buttons'
import { ArrowOutsideIcon } from './icons/ArrowOutsideIcon'

const DECIMALS = new BN(12)

export function TransferButton(props: { from: Account; to: Account }) {
  const { api } = useApi()
  const { keyring } = useKeyring()
  const [isOpen, setIsOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const transferAmount = 1234
  const toAddress = props.to.address

  if (!api || !keyring) {
    return <></>
  }

  const formatAmount = (number: number) => new BN(number).mul(BN_TEN.pow(DECIMALS))
  const onClose = () => {
    setIsSending(false)
    setIsOpen(false)
  }

  const signAndSend = async () => {
    setIsSending(true)

    await api.tx.balances
      .transfer(toAddress, formatAmount(transferAmount))
      .signAndSend(keyring.getPair(props.from.address), (result) => {
        const { status } = result

        if (status.isFinalized) {
          onClose()
        }

        status.isFinalized
          ? console.log(`Finalized. Block hash: ${status.asFinalized.toString()}`)
          : console.log(`Current transaction status: ${status.type}`)
      })
      .catch((error) => console.log('Error', error))
  }

  return (
    <>
      <ButtonForTransfer onClick={() => setIsOpen(true)}>
        <ArrowOutsideIcon />
      </ButtonForTransfer>
      {isOpen && (
        <Background>
          <ModalContent>
            <CloseButton onClick={onClose}>close</CloseButton>

            <FormLabel>From</FormLabel>

            <p>
              {props.from.name}
              <br />
              {props.from.address}
            </p>

            <p>Amount: {transferAmount} Unit</p>

            <FormLabel>Destination account</FormLabel>
            <p>
              {props.to.name}
              <br />
              {props.to.address}
            </p>

            <ButtonGhostMedium onClick={signAndSend} disabled={isSending}>
              {isSending ? 'Sending...' : 'Send'}
            </ButtonGhostMedium>
          </ModalContent>
        </Background>
      )}
    </>
  )
}

const ButtonForTransfer = styled(ButtonGhostMediumSquare)`
  svg {
    color: ${Colors.Black[900]};
  }
`

const FormLabel = styled.div`
  font-weight: bold;
`

const Background = styled.div`
  z-index: 100000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  padding-top: 64px;
`

const ModalContent = styled.div`
  position: relative;
  background-color: ${Colors.White};
  margin: 30px auto 0 auto;
  max-width: 480px;
  border-radius: 12px;
  box-shadow: ${Colors.Black};
  padding: 12px 24px;
`

const CloseButton = styled.button`
  cursor: pointer;
  background: none;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  position: absolute;
  right: 12px;
  top: 12px;
`
