import { SubmittableExtrinsic } from '@polkadot/api/types'
import { web3FromAddress } from '@polkadot/extension-dapp'
import { EventRecord } from '@polkadot/types/interfaces/system'
import { ISubmittableResult } from '@polkadot/types/types'
import { useEffect, useState } from 'react'
import { Account } from '../common/types'
import { useApi } from './useApi'
import { useKeyring } from './useKeyring'
import { useObservable } from './useObservable'
import { useToggle } from './useToggle'

interface UseSignAndSendTransactionParams {
  transaction: SubmittableExtrinsic<'rxjs'> | undefined
  from: Account
}

type TransactionStep = 'READY' | 'EXTENSION' | 'PENDING' | 'SUCCESS' | 'ERROR'

const isError = (events: EventRecord[]) => events.find(({ event: { method } }) => method === 'ExtrinsicFailed')

const statusCallback = (setStep: (step: TransactionStep) => void) => (result: ISubmittableResult) => {
  const { status, events } = result

  console.log(`Current transaction status: ${status.type}`)

  if (status.isReady) {
    setStep('PENDING')
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

  setStep(isError(events) ? 'ERROR' : 'SUCCESS')
}

export const useSignAndSendTransaction = ({ transaction, from }: UseSignAndSendTransactionParams) => {
  const [isSending, toggleSending] = useToggle()
  const keyring = useKeyring()
  const { api } = useApi()
  const paymentInfo = useObservable(transaction?.paymentInfo(from.address), [from])
  const [step, setStep] = useState<TransactionStep>('READY')

  const sendTransaction = () => {
    if (step === 'READY') {
      toggleSending()
    }
  }

  useEffect(() => {
    if (!isSending || !transaction || !paymentInfo) {
      return
    }

    const keyringPair = keyring.getPair(from.address)

    if (keyringPair.meta.isInjected) {
      setStep('EXTENSION')
      web3FromAddress(from.address).then(({ signer }) => {
        transaction.signAndSend(from.address, { signer: signer }).subscribe(statusCallback(setStep))
      })
    } else {
      setStep('PENDING')
      transaction.signAndSend(keyringPair).subscribe(statusCallback(setStep))
    }
  }, [api, isSending])

  return {
    send: sendTransaction,
    paymentInfo,
    status: step,
  }
}
