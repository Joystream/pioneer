import styled from 'styled-components'
import { BorderRad, Colors } from '../constants'
import { useApi } from '../hooks/useApi'
import { useKeyring } from '../hooks/useKeyring'
import React, { useState } from 'react'
import { formatTokenValue, toChainTokenValue } from '../utils/formatters'
import { Modal, ModalBody, ModalFooter, ModalHeader } from './modal'
import { ButtonPrimaryMedium, ButtonSecondarySmall } from './buttons/Buttons'
import { Account } from '../hooks/types'
import { AccountInfo } from './AccountInfo'
import { useBalances } from '../hooks/useBalances'
import { useNumberInput } from '../hooks/useNumberInput'

interface Props {
  onClose: () => void
  from: Account
  to: Account
}

export function TransferModal({ from, to, onClose }: Props) {
  const { api } = useApi()
  const { keyring } = useKeyring()
  const balances = useBalances([from, to])
  const [isSending, setIsSending] = useState(false)
  const [amount, setAmount] = useNumberInput(0)

  const amountAsNumber = parseInt(amount)
  const isSendDisabled = isSending || amountAsNumber <= 0

  const signAndSend = async () => {
    setIsSending(true)

    if (!api || !keyring) {
      return
    }

    await api.tx.balances
      .transfer(to.address, toChainTokenValue(amountAsNumber))
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
            <AccountInfo account={from} />
            <TransactionInfoRow>
              <InfoTitle>Transferable balance</InfoTitle>
              <InfoValue>{formatTokenValue(balances?.map[from.address]?.total)}</InfoValue>
            </TransactionInfoRow>
          </FromBlock>
        </Row>
        <TransactionAmount>
          <AmountInputBlock>
            <AmountInputLabel>Number of tokens</AmountInputLabel>
            <AmountInput value={amount} onChange={(event) => setAmount(event.target.value)} />
          </AmountInputBlock>
          <AmountButtons>
            <AmountButton>Use half</AmountButton>
            <AmountButton>Use max</AmountButton>
          </AmountButtons>
        </TransactionAmount>
        <Row>
          <FormLabel>Destination account</FormLabel>
          <ToBlock>
            <AccountInfo account={to} />
            <TransactionInfoRow>
              <InfoTitle>Total balance</InfoTitle>
              <InfoValue>{formatTokenValue(balances?.map[to.address]?.total)}</InfoValue>
            </TransactionInfoRow>
          </ToBlock>
        </Row>
      </ModalBody>
      <ModalFooter>
        <TransactionInfo>
          <TransactionInfoRow>
            <InfoTitle>Amount:</InfoTitle>
            <InfoValue>{formatTokenValue(0)}</InfoValue>
          </TransactionInfoRow>
          <TransactionInfoRow>
            <InfoTitle>Transaction fee:</InfoTitle>
            <InfoValue>{formatTokenValue(0)}</InfoValue>
          </TransactionInfoRow>
        </TransactionInfo>
        <ButtonPrimaryMedium onClick={signAndSend} disabled={isSendDisabled}>
          {isSending ? 'Sending...' : 'Send'}
        </ButtonPrimaryMedium>
      </ModalFooter>
    </Modal>
  )
}

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
const AmountInput = styled.input`
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
