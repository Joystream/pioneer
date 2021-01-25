import Identicon from '@polkadot/react-identicon'
import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonGhostMedium, ButtonGhostMediumSquare } from './buttons/Buttons'
import { Close } from '../components/buttons/CloseCross'
import { CopyButton } from '../components/buttons/CopyButton'
import { BorderRad, Colors, Shadows } from '../constants'
import { Account } from '../hooks/types'
import { useApi } from '../hooks/useApi'
import { useKeyring } from '../hooks/useKeyring'
import { ButtonPrimaryMedium, ButtonSecondarySmall } from './buttons/Buttons'
import { ArrowOutsideIcon, ArrowOutsideStyles } from './icons/ArrowOutsideIcon'
import { CrossIcon } from './icons/CrossIcon'
import { formatTokenValue, toChainTokenValue } from '../utils/formatters'

export function TransferButton(props: { from: Account; to: Account; address?: Account }) {
  const { api } = useApi()
  const { keyring } = useKeyring()
  const [isOpen, setIsOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const transferAmount = toChainTokenValue(1234)
  const toAddress = props.to.address

  const onClose = () => {
    setIsSending(false)
    setIsOpen(false)
  }

  const signAndSend = async () => {
    setIsSending(true)

    if (!api || !keyring) {
      return
    }

    await api.tx.balances
      .transfer(toAddress, transferAmount)
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
        <ModalGlass>
          <Modal>
            <ModalHeader>
              <CloseButton onClick={onClose}>
                <CrossIcon />
              </CloseButton>
              <ArrowOutsideIcon />
              <ModalTitle>Send tokens</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Row>
                <FormLabel>From</FormLabel>
                <FromBlock>
                  <AccountInfo>
                    <AccountPhoto>
                      <Identicon size={40} theme={'beachball'} value={props.from.address} />
                    </AccountPhoto>
                    {/*<AccountType>Root account</AccountType>*/}
                    <AccountName>{props.from.name}</AccountName>
                    <AccountCopyAddress>
                      <AccountAddress>{props.from.address}</AccountAddress>
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
                      <Identicon size={40} theme={'beachball'} value={props.to.address} />
                    </AccountPhoto>
                    {/*<AccountType>Root account</AccountType>*/}
                    <AccountName>{props.to.name}</AccountName>
                    <AccountCopyAddress>
                      <AccountAddress>{props.to.address}</AccountAddress>
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
        </ModalGlass>
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
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
  font-weight: 700;
`

const ModalGlass = styled.div`
  display: grid;
  grid-template-columns: minmax(80px, 1.2fr) minmax(max-content, 904px) minmax(60px, 1fr);
  grid-template-rows: 1fr;
  grid-template-areas: '. modal .';
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: 136px;
  background-color: ${Colors.Black[700.75]};
  z-index: 100000;
`

const Modal = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 76px auto 72px;
  grid-template-areas:
    'modalheader'
    'modalbody'
    'modalfooter';
  grid-area: modal;
  position: relative;
  background-color: ${Colors.White};
  width: 100%;
  max-width: 904px;
  height: min-content;
  border-radius: ${BorderRad.s};
  box-shadow: ${Shadows.common};
`

const ModalHeader = styled.header`
  display: grid;
  position: relative;
  grid-auto-flow: column;
  grid-area: modalheader;
  justify-content: start;
  align-items: center;
  padding: 24px;
  border-radius: 2px 2px 0px 0px;

  ${ArrowOutsideStyles} {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
`

const ModalBody = styled.div`
  display: grid;
  grid-area: modalbody;
  grid-row-gap: 24px;
  padding: 16px 24px 40px;
  border-top: 1px solid ${Colors.Black[200]};
  border-bottom: 1px solid ${Colors.Black[200]};
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

// const AccountType = styled.p`
//   display: flex;
//   grid-area: accounttype;
//   justify-content: center;
//   width: fit-content;
//   margin: 0;
//   padding: 0 8px;
//   font-size: 10px;
//   line-height: 16px;
//   border-radius: 8px;
//   color: ${Colors.White};
//   background-color: ${Colors.Blue[200]};
//   text-transform: uppercase;
// `

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

const ModalFooter = styled.footer`
  display: grid;
  grid-area: modalfooter;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr auto;
  grid-column-gap: 46px;
  justify-items: end;
  align-items: center;
  padding: 12px 16px;
  border-radius: 0px 0px 2px 2px;
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

const ModalTitle = styled.h4``

const CloseButton = styled(Close)`
  position: absolute;
  right: 16px;
`
