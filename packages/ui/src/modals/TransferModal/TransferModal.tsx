import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React, { ReactElement, useEffect, useState } from 'react'
import { Observable, Subscription } from 'rxjs'
import { Account } from '../../hooks/types'
import { useKeyring } from '../../hooks/useKeyring'
import { WaitModal } from '../WaitModal'
import { SignTransferModal } from './SignTransferModal'
import { TransactionFailureModal } from './TransactionFailureModal'
import { TransactionSuccessModal } from './TransactionSuccessModal'
import { TransferDetailsModal } from './TransferDetailsModal'

interface Props {
  onClose: () => void
  from?: Account
  to?: Account
  icon: ReactElement
}

type ModalState = 'SEND_TOKENS' | 'SIGN_TRANSACTION' | 'EXTENSION_SIGN' | 'SENDING' | 'SUCCESS' | 'ERROR'

export function TransferModal({ from, to, onClose, icon }: Props) {
  const keyring = useKeyring()
  const [step, setStep] = useState<ModalState>('SEND_TOKENS')
  const [amount, setAmount] = useState<BN>(new BN(0))
  const [transferFrom, setTransferFrom] = useState(from)
  const [transferTo, setTransferTo] = useState<Account | undefined>(to)
  const [subscription, setSubscription] = useState<Subscription | undefined>(undefined)
  const isTransfer = !from && !to
  const isSend = !!from
  const title = isTransfer ? 'Transfer tokens' : isSend ? 'Send tokens' : 'Receive tokens'

  useEffect(() => {
    if (subscription) {
      return () => subscription.unsubscribe()
    }
  }, [subscription])

  const onAccept = (amount: BN, from: Account, to: Account) => {
    setAmount(amount)
    setTransferTo(to)
    setTransferFrom(from)
    setStep('SIGN_TRANSACTION')
  }

  const onSign = (transaction: Observable<ISubmittableResult>) => {
    if (!transferFrom) {
      return
    }

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

      setStep('SUCCESS')
    }

    if (keyring.getPair(transferFrom.address).meta.isInjected) {
      setStep('EXTENSION_SIGN')
    } else {
      setStep('SENDING')
    }

    setSubscription(transaction.subscribe(statusCallback))
  }

  if (step === 'SEND_TOKENS' || !transferTo || !transferFrom) {
    return (
      <TransferDetailsModal
        onClose={onClose}
        from={transferFrom}
        to={transferTo}
        onAccept={onAccept}
        title={title}
        icon={icon}
      />
    )
  }

  if (step === 'SIGN_TRANSACTION') {
    return <SignTransferModal onClose={onClose} from={transferFrom} amount={amount} to={transferTo} onSign={onSign} />
  }

  const loremDescription =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. ' +
    'Minus, a saepe ducimus qui quo optio totam explicabo delectus recusandae officia tenetur molestias,' +
    ' excepturi, amet corrupti reiciendis quam nulla magni esse?'

  if (step === 'EXTENSION_SIGN') {
    return <WaitModal title="Waiting for the extension" description={loremDescription} />
  }

  if (step === 'SENDING') {
    return <WaitModal title="Wait for the transaction" description={loremDescription} />
  }

  if (step === 'SUCCESS') {
    return <TransactionSuccessModal onClose={onClose} from={transferFrom} to={transferTo} amount={amount} />
  }

  return <TransactionFailureModal onClose={onClose} from={transferFrom} amount={amount} to={transferTo} />
}
