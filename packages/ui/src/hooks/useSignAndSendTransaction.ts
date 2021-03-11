import React from 'react'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { web3FromAddress } from '@polkadot/extension-dapp'
import { EventRecord } from '@polkadot/types/interfaces/system'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import { useEffect, useState } from 'react'
import { Observable } from 'rxjs'
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

const observeTransaction = (
  transaction: Observable<ISubmittableResult>,
  setStatus: React.Dispatch<TransactionStatus>
) => {
  const statusCallback = (result: ISubmittableResult) => {
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

      setStatus(isError(events) ? 'ERROR' : 'SUCCESS')
    }
  }

  const errorHandler = () => setStatus('ERROR')

  transaction.subscribe(statusCallback, errorHandler)
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
        observeTransaction(transaction.signAndSend(from.address, { signer: signer }), setStatus)
      })
    } else {
      setStatus('PENDING')
      observeTransaction(transaction.signAndSend(keyringPair), setStatus)
    }
  }, [api, status])

  useEffect(() => {
    if (status === 'SUCCESS' || status === 'ERROR') {
      onDone(status === 'SUCCESS', paymentInfo?.partialFee.toBn() || new BN(0))
    }
  }, [status])

  return {
    send: () => setStatus('SIGN'),
    paymentInfo,
    status,
  }
}
