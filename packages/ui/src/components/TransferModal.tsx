import React, { useState } from 'react'
import styled from 'styled-components'
import BN from 'bn.js'
import { BorderRad, Colors } from '../constants'
import { useBalances } from '../hooks/useBalances'
import { Account } from '../hooks/types'
import { Modal, ModalBody, ModalHeader } from './modal'
import { SignTransferModal } from './transfer/SignTransferModal'
import { TransferDetailsModal } from './transfer/TransferDetailsModal'

interface Props {
  onClose: () => void
  from: Account
  to: Account
}

type ModalState = 'SEND_TOKENS' | 'SIGN_TRANSACTION' | 'SENDING'

export function TransferModal({ from, to, onClose }: Props) {
  const { hasBalances } = useBalances([from, to])
  const [step, setStep] = useState<ModalState>('SEND_TOKENS')
  const [amount, setAmount] = useState<BN>(new BN(0))

  const onAccept = (amount: BN) => {
    setAmount(amount)
    setStep('SIGN_TRANSACTION')
  }

  if (!hasBalances) {
    return (
      <Modal>
        <ModalHeader onClick={onClose} title={''} />
        <ModalBody>Loading balances...</ModalBody>
      </Modal>
    )
  }

  if (step === 'SEND_TOKENS') {
    return <TransferDetailsModal onClose={onClose} from={from} to={to} onAccept={onAccept} />
  }

  return <SignTransferModal onClose={onClose} from={from} amount={amount} to={to} />
}

export const FormLabel = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
  font-weight: 700;
`
export const Row = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`
export const AccountRow = styled.div`
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
export const LockedAccount = styled(AccountRow)`
  background-color: ${Colors.Black[50]};
`
export const TransactionAmount = styled.div`
  display: grid;
  grid-template-columns: 284px auto;
  grid-template-rows: 1fr;
  grid-column-gap: 24px;
  align-items: end;
`
export const AmountInputBlock = styled.div`
  display: flex;
  flex-direction: column;
`

export const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
`
export const TransactionInfoRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 128px;
  grid-template-rows: 1fr;

  & + & {
    margin-top: 4px;
  }
`
export const InfoTitle = styled.span`
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: right;
  color: ${Colors.Black[400]};
`
export const InfoValue = styled.span`
  display: grid;
  position: relative;
  text-align: right;
  line-height: 20px;
`
