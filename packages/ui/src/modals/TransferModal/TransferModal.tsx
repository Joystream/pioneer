import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'
import { Observable, Subscription } from 'rxjs'
import styled from 'styled-components'
import { BorderRad, Colors } from '../../constants'
import { Account } from '../../hooks/types'
import { useKeyring } from '../../hooks/useKeyring'
import { WaitModal } from '../WaitModal'
import { SignTransferModal } from './SignTransferModal'
import { TransferDetailsModal } from './TransferDetailsModal'
import { WaitForTheExtensionModal } from './WaitForTheExtensionModal'

interface Props {
  onClose: () => void
  from: Account
  to?: Account
}

type ModalState = 'SEND_TOKENS' | 'SIGN_TRANSACTION' | 'EXTENSION_SIGN' | 'SENDING'

export function TransferModal({ from, to, onClose }: Props) {
  const keyring = useKeyring()
  const [step, setStep] = useState<ModalState>('SEND_TOKENS')
  const [amount, setAmount] = useState<BN>(new BN(0))
  const [transferTo, setTransferTo] = useState<Account | undefined>(to)
  const [subscription, setSubscription] = useState<Subscription | undefined>(undefined)

  useEffect(() => {
    if (subscription) {
      return () => subscription.unsubscribe()
    }
  }, [subscription])

  const onAccept = (amount: BN, to: Account) => {
    setAmount(amount)
    setTransferTo(to)
    setStep('SIGN_TRANSACTION')
  }

  const onSign = (transaction: Observable<ISubmittableResult>) => {
    const statusCallback = (result: ISubmittableResult) => {
      const { status } = result

      console.log(`Current transaction status: ${status.type}`)

      if (status.isReady) {
        setStep('SENDING')
      }

      if (!status.isInBlock) {
        return
      }

      console.log(`In Block. Block hash: ${status.asInBlock.toString()}`)

      onClose()
    }

    setSubscription(transaction.subscribe(statusCallback))

    if (keyring.getPair(from.address).meta.isInjected) {
      setStep('EXTENSION_SIGN')
    } else {
      setStep('SENDING')
    }
  }

  if (step === 'SEND_TOKENS' || !transferTo) {
    return <TransferDetailsModal onClose={onClose} from={from} to={transferTo} onAccept={onAccept} />
  }

  if (step === 'SIGN_TRANSACTION') {
    return <SignTransferModal onClose={onClose} from={from} amount={amount} to={transferTo} onSign={onSign} />
  }

  if (step === 'EXTENSION_SIGN') {
    return <WaitForTheExtensionModal />
  }

  return <WaitModal title="Wait for the transaction" description="..." />
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
export const BalanceInfo = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 128px;
  grid-template-rows: 1fr;
  align-items: center;

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

export const TransactionAmountInfo = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  width: fit-content;
  justify-self: center;
  align-items: center;
  color: ${Colors.Black[900]};
`

export const TransactionAmountInfoText = styled.span`
  padding: 0 8px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[900]};
  text-transform: uppercase;
  border-radius: ${BorderRad.m};
  background-color: ${Colors.Black[75]};

  .TokenValue {
    font-size: 12px;
    line-height: 16px;
    font-weight: 700;
    color: ${Colors.Black[900]};
  }
`
