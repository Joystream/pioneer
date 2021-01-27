import React, { useState } from 'react'
import styled from 'styled-components'
import BN from 'bn.js'
import { BorderRad, Colors } from '../constants'
import { useApi } from '../hooks/useApi'
import { useBalances } from '../hooks/useBalances'
import { useNumberInput } from '../hooks/useNumberInput'
import { useKeyring } from '../hooks/useKeyring'
import { Account } from '../hooks/types'
import { formatTokenValue } from '../utils/formatters'
import { Modal, ModalBody, ModalFooter, ModalHeader } from './modal'
import { ButtonPrimaryMedium, ButtonSecondarySmall } from './buttons/Buttons'
import { AccountInfo } from './AccountInfo'
import { RuntimeDispatchInfo } from '@polkadot/types/interfaces'

interface Props {
  onClose: () => void
  from: Account
  to: Account
}

type ModalState = 'SEND_TOKENS' | 'SIGN_TRANSACTION' | 'SENDING'

export function TransferModal({ from, to, onClose }: Props) {
  const { api } = useApi()
  const { keyring } = useKeyring()
  const balances = useBalances([from, to])
  const [isSending, setIsSending] = useState(false)
  const [amount, setAmount] = useNumberInput(0)
  const [step, setStep] = useState<ModalState>('SEND_TOKENS')
  const [info, setInfo] = useState<RuntimeDispatchInfo | null>(null)

  if (!balances.hasBalances) {
    return (
      <Modal>
        <ModalBody>Loading balances...</ModalBody>
      </Modal>
    )
  }

  const transferableBalance = balances?.map[from.address]?.total

  const isOverBalance = new BN(amount).gt(transferableBalance)
  const isZero = new BN(amount).lte(new BN(0))
  const isTransferDisabled = isSending || isZero || isOverBalance
  const title = step === 'SIGN_TRANSACTION' ? 'Authorize transaction' : 'Send tokens'
  const submittableExtrinsic = api?.tx.balances.transfer(to.address, new BN(amount))

  submittableExtrinsic?.paymentInfo(from.address).then((info) => {
    console.log(info)
    setInfo(info)
  })

  const setHalf = () => setAmount(transferableBalance.div(new BN(2)).toString())
  const setMax = () => setAmount(transferableBalance.toString())
  const signAndSend = async () => {
    setIsSending(true)

    if (!submittableExtrinsic) {
      return
    }

    await submittableExtrinsic
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
      <ModalHeader onClick={onClose} title={title} />
      <ModalBody>
        {step === 'SEND_TOKENS' && (
          <>
            <Row>
              <FormLabel>From</FormLabel>
              <LockedAccount>
                <AccountInfo account={from} />
                <TransactionInfoRow>
                  <InfoTitle>Transferable balance</InfoTitle>
                  <InfoValue>{formatTokenValue(transferableBalance)}</InfoValue>
                </TransactionInfoRow>
              </LockedAccount>
            </Row>
            <TransactionAmount>
              <AmountInputBlock>
                <AmountInputLabel>Number of tokens</AmountInputLabel>
                <AmountInput value={amount} onChange={(event) => setAmount(event.target.value)} placeholder={'0'} />
              </AmountInputBlock>
              <AmountButtons>
                <AmountButton onClick={setHalf}>Use half</AmountButton>
                <AmountButton onClick={setMax}>Use max</AmountButton>
              </AmountButtons>
            </TransactionAmount>
            <Row>
              <FormLabel>Destination account</FormLabel>
              <AccountRow>
                <AccountInfo account={to} />
                <TransactionInfoRow>
                  <InfoTitle>Total balance</InfoTitle>
                  <InfoValue>{formatTokenValue(balances?.map[to.address]?.total)}</InfoValue>
                </TransactionInfoRow>
              </AccountRow>
            </Row>
          </>
        )}
        {step === 'SIGN_TRANSACTION' && (
          <>
            <Row>
              <FormLabel>From</FormLabel>
              <AccountRow>
                <AccountInfo account={from} />
                <TransactionInfoRow>
                  <InfoTitle>Transferable balance</InfoTitle>
                  <InfoValue>{formatTokenValue(transferableBalance)}</InfoValue>
                </TransactionInfoRow>
              </AccountRow>
            </Row>
            <TransactionAmount>Transferring {formatTokenValue(new BN(amount))}</TransactionAmount>
            <Row>
              <FormLabel>Destination account</FormLabel>
              <AccountRow>
                <AccountInfo account={to} />
                <TransactionInfoRow>
                  <InfoTitle>Total balance</InfoTitle>
                  <InfoValue>{formatTokenValue(balances?.map[to.address]?.total)}</InfoValue>
                </TransactionInfoRow>
              </AccountRow>
            </Row>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        {step === 'SIGN_TRANSACTION' && (
          <>
            <TransactionInfo>
              <TransactionInfoRow>
                <InfoTitle>Amount:</InfoTitle>
                <InfoValue>{formatTokenValue(new BN(amount))}</InfoValue>
              </TransactionInfoRow>
              <TransactionInfoRow>
                <InfoTitle>Transaction fee:</InfoTitle>
                <InfoValue>{formatTokenValue(info?.partialFee.toBn() || 0)}</InfoValue>
              </TransactionInfoRow>
            </TransactionInfo>
          </>
        )}
        {step === 'SEND_TOKENS' && (
          <ButtonPrimaryMedium onClick={() => setStep('SIGN_TRANSACTION')} disabled={isTransferDisabled}>
            Transfer tokens
          </ButtonPrimaryMedium>
        )}
        {step === 'SIGN_TRANSACTION' && (
          <ButtonPrimaryMedium onClick={signAndSend}>Sign transaction and Transfer </ButtonPrimaryMedium>
        )}
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
const AccountRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  min-height: 94px;
  padding: 16px 132px 16px 14px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
`
const LockedAccount = styled(AccountRow)`
  background-color: ${Colors.Black[50]};
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
