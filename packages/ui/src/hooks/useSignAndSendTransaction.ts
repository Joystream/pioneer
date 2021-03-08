import { SubmittableExtrinsic } from '@polkadot/api/types'
import { web3FromAddress } from '@polkadot/extension-dapp'
import { EventRecord } from '@polkadot/types/interfaces/system'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import { useEffect, useState } from 'react'
import { Account } from '../common/types'
import { useApi } from './useApi'
import { useKeyring } from './useKeyring'
import { useObservable } from './useObservable'

interface UseSignAndSendTransactionParams {
  transaction: SubmittableExtrinsic<'rxjs'> | undefined
  from: Account
  onDone: (success: boolean, fee: BN) => void
}

type TransactionStatus = 'READY' | 'SIGN' | 'EXTENSION' | 'PENDING' | 'SUCCESS' | 'ERROR'

const isError = (events: EventRecord[]) => events.find(({ event: { method } }) => method === 'ExtrinsicFailed')

const statusCallback = (setStatus: (status: TransactionStatus) => void) => (result: ISubmittableResult) => {
  const { status, events } = result

  console.log(`Current transaction status: ${status.type}`)

  if (status.isReady) {
    setStatus('PENDING')
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

  setStatus(isError(events) ? 'ERROR' : 'SUCCESS')
}

export const useSignAndSendTransaction = ({ transaction, from, onDone }: UseSignAndSendTransactionParams) => {
  const keyring = useKeyring()
  const { api } = useApi()
  const paymentInfo = useObservable(transaction?.paymentInfo(from.address), [from])
  const [status, setStatus] = useState<TransactionStatus>('READY')

  useEffect(() => {
    if (status !== 'SIGN' || !transaction || !paymentInfo) {
      return
    }

    const keyringPair = keyring.getPair(from.address)

    if (keyringPair.meta.isInjected) {
      setStatus('EXTENSION')
      web3FromAddress(from.address).then(({ signer }) => {
        transaction.signAndSend(from.address, { signer: signer }).subscribe(statusCallback(setStatus))
      })
    } else {
      setStatus('PENDING')
      transaction.signAndSend(keyringPair).subscribe(statusCallback(setStatus))
    }
  }, [api, status])

  useEffect(() => {
    if (status === 'SUCCESS' || status === 'ERROR') {
      onDone(status === 'SUCCESS', paymentInfo?.partialFee.toBn() || new BN(0))
    }
  })

  return {
    send: () => setStatus('SIGN'),
    paymentInfo,
    status,
  }
}
