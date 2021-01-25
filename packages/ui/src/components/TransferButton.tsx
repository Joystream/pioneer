import Identicon from '@polkadot/react-identicon'
import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonGhostMediumSquare, ButtonPrimaryMedium, ButtonSecondarySmall } from './buttons/Buttons'
import { CopyButton } from './buttons/CopyButton'
import { BorderRad, Colors } from '../constants'
import { Account } from '../hooks/types'
import { useApi } from '../hooks/useApi'
import { useKeyring } from '../hooks/useKeyring'
import { ArrowOutsideIcon } from './icons/ArrowOutsideIcon'
import { formatTokenValue, toChainTokenValue } from '../utils/formatters'
import { Modal, ModalBody, ModalFooter, ModalHeader } from './modal'

interface Props {
  onClose: () => void
  from: Account
  to: Account
}

function TransferModal({ from, to, onClose }: Props) {
  const { api } = useApi()
  const { keyring } = useKeyring()
  const [isSending, setIsSending] = useState(false)

  const transferAmount = toChainTokenValue(1234)

  const signAndSend = async () => {
    setIsSending(true)

    if (!api || !keyring) {
      return
    }

    await api.tx.balances
      .transfer(to.address, transferAmount)
      .signAndSend(keyring.getPair(from.address), (result) => {
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
    <Modal>
      <ModalHeader onClick={onClose} title="Send tokens" />
      <ModalBody>
        <Row>
          <FormLabel>From</FormLabel>
          <FromBlock>
            <AccountInfo>
              <AccountPhoto>
                <Identicon size={40} theme={'beachball'} value={from.address} />
              </AccountPhoto>
              {/*<AccountType>Root account</AccountType>*/}
              <AccountName>{from.name}</AccountName>
              <AccountCopyAddress>
                <AccountAddress>{from.address}</AccountAddress>
                <AccountCopyButton />
              </AccountCopyAddress>
            </AccountInfo>
            <TransactionInfoRow>
              <InfoTitle>Transferable balance</InfoTitle>
              <InfoValue>9,900.000</InfoValue>
            </TransactionInfoRow>
          </FromBlock>
        </Row>
        <TransactionAmount>
          <AmountInputBlock>
            <AmountInputLabel>Number of tokens</AmountInputLabel>
            <AmountInput>{formatTokenValue(transferAmount)}</AmountInput>
          </AmountInputBlock>
          <AmountButtons>
            <AmountButton>Use half</AmountButton>
            <AmountButton>Use max</AmountButton>
          </AmountButtons>
        </TransactionAmount>
        <Row>
          <FormLabel>Destination account</FormLabel>
          <ToBlock>
            <AccountInfo>
              <AccountPhoto>
                <Identicon size={40} theme={'beachball'} value={to.address} />
              </AccountPhoto>
              {/*<AccountType>Root account</AccountType>*/}
              <AccountName>{to.name}</AccountName>
              <AccountCopyAddress>
                <AccountAddress>{to.address}</AccountAddress>
                <AccountCopyButton />
              </AccountCopyAddress>
            </AccountInfo>
            <TransactionInfoRow>
              <InfoTitle>Total balance</InfoTitle>
              <InfoValue>9,900.000</InfoValue>
            </TransactionInfoRow>
          </ToBlock>
        </Row>
      </ModalBody>
      <ModalFooter>
        <TransactionInfo>
          <TransactionInfoRow>
            <InfoTitle>Amount:</InfoTitle>
            <InfoValue>9,900.000</InfoValue>
          </TransactionInfoRow>
          <TransactionInfoRow>
            <InfoTitle>Transaction fee:</InfoTitle>
            <InfoValue>2.000</InfoValue>
          </TransactionInfoRow>
        </TransactionInfo>
        <ButtonPrimaryMedium onClick={signAndSend} disabled={isSending}>
          {isSending ? 'Sending...' : 'Send'}
        </ButtonPrimaryMedium>
      </ModalFooter>
    </Modal>
  )
}

export function TransferButton(props: { from: Account; to: Account; address?: Account }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ButtonForTransfer onClick={() => setIsOpen(true)}>
        <ArrowOutsideIcon />
      </ButtonForTransfer>
      {isOpen && <TransferModal onClose={() => setIsOpen(false)} from={props.from} to={props.to} />}
    </>
  )
}

const ButtonForTransfer = styled(ButtonGhostMediumSquare)`
  svg {
    color: ${Colors.Black[900]};
  }
`

const FormLabel = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
  font-weight: 700;
`

const Row = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`

const FromBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  min-height: 94px;
  padding: 16px 132px 16px 14px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.Black[50]};
`

const ToBlock = styled(FromBlock)`
  background-color: ${Colors.White};
`

const TransactionAmount = styled.div`
  display: grid;
  grid-template-columns: 284px auto;
  grid-template-rows: 1fr;
  grid-column-gap: 24px;
  align-items: end;
`

const AmountInputBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const AmountInputLabel = styled.span`
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  color: ${Colors.Black[900]};
`

const AmountInput = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${Colors.Black[900]};
  border-radius: ${BorderRad.s};
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
`

const AmountButtons = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  width: fit-content;
  height: 46px;
  align-items: center;
`

const AmountButton = styled(ButtonSecondarySmall)``

const AccountInfo = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: min-content, 24px 18px;
  grid-column-gap: 12px;
  grid-template-areas:
    'accountphoto accounttype'
    'accountphoto accountname'
    'accountphoto accountaddress';
  align-items: center;
  width: 100%;
  justify-self: start;
`

const AccountPhoto = styled.div`
  display: flex;
  grid-area: accountphoto;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  align-self: center;
  height: 40px;
  width: 40px;
  background-color: ${Colors.Blue[500]};
  border-radius: ${BorderRad.full};
  overflow: hidden;
`

const AccountName = styled.h5`
  grid-area: accountname;
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: ${Colors.Black[900]};
`

const AccountCopyAddress = styled.div`
  display: flex;
  grid-area: accountaddress;
  color: ${Colors.Black[400]};
`

const AccountAddress = styled.span`
  max-width: 152px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 18px;
  color: ${Colors.Black[400]};
`

const AccountCopyButton = styled(CopyButton)`
  color: ${Colors.Black[400]};
`

const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const TransactionInfoRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 128px;
  grid-template-rows: 1fr;

  & + & {
    margin-top: 4px;
  }
`

const InfoTitle = styled.span`
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: right;
  color: ${Colors.Black[400]};
`

const InfoValue = styled.span`
  display: grid;
  position: relative;
  text-align: right;
  line-height: 20px;
`
