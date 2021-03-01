import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React, { ReactElement, useEffect, useState } from 'react'
import { Observable, Subscription } from 'rxjs'
import { Account } from '../../common/types'
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

type ModalState = 'PREPARE' | 'AUTHORIZE' | 'EXTENSION_SIGN' | 'SENDING' | 'SUCCESS' | 'ERROR'

export function TransferModal({ from, to, onClose, icon }: Props) {
  const keyring = useKeyring()
  const [step, setStep] = useState<ModalState>('PREPARE')
  const [amount, setAmount] = useState<BN>(new BN(0))
  const [fee, setFee] = useState<BN>(new BN(0))
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
    setStep('AUTHORIZE')
  }

  const onSign = (transaction: Observable<ISubmittableResult>, fee: BN) => {
    if (!transferFrom) {
      return
    }

    const statusCallback = (result: ISubmittableResult) => {
      const { status, events } = result

      console.log(`Current transaction status: ${status.type}`)

      if (status.isReady) {
        setStep('SENDING')
      }

      if (status.isInBlock) {
        console.log('Included at block hash', JSON.stringify(status.asInBlock))
        console.log('Events:')

        events.forEach(({ event: { data, method, section }, phase }) => {
          console.log('\t', JSON.stringify(phase), `: ${section}.${method}`, JSON.stringify(data))
        })
        console.log(JSON.stringify(events))
      }

      if (!status.isFinalized) {
        return
      }

      const isSuccess = events.find(({ event }) => {
        const { method } = event
        return method === 'ExtrinsicSuccess'
      })

      const isError = events.find(({ event }) => {
        const { method } = event
        return method === 'ExtrinsicFailed'
      })

      console.log(
        `Finalized. Block hash: ${JSON.stringify(status.asFinalized)}\n\t- success: ${isSuccess}\n\t- error: ${isError}`
      )

      setStep('SUCCESS')
    }

    if (keyring.getPair(transferFrom.address).meta.isInjected) {
      setStep('EXTENSION_SIGN')
    } else {
      setStep('SENDING')
    }

    setFee(fee)
    setSubscription(transaction.subscribe(statusCallback))
  }

  if (step === 'PREPARE' || !transferTo || !transferFrom) {
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

  if (step === 'AUTHORIZE') {
    return <SignTransferModal onClose={onClose} from={transferFrom} amount={amount} to={transferTo} onSign={onSign} />
  }

  if (step === 'EXTENSION_SIGN') {
    return (
      <WaitModal
        title="Waiting for the extension"
        description={'Please, sign the transaction using external signer app.'}
      />
    )
  }

  if (step === 'SENDING') {
    return (
      <WaitModal
        title="Pending transaction"
        description={
          'We are waiting for your transaction to be mined. It can takes Lorem ipsum deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim.'
        }
      />
    )
  }

  if (step === 'SUCCESS') {
    return <TransactionSuccessModal onClose={onClose} from={transferFrom} to={transferTo} amount={amount} fee={fee} />
  }

  return <TransactionFailureModal onClose={onClose} from={transferFrom} amount={amount} to={transferTo} />
}
