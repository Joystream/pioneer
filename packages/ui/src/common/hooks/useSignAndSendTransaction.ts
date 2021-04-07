import { SubmittableExtrinsic } from '@polkadot/api/types'
import { web3FromAddress } from '@polkadot/extension-dapp'
import { EventRecord } from '@polkadot/types/interfaces/system'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'
import { Observable } from 'rxjs'

import { Address, onTransactionDone } from '../types'
import { useApi } from './useApi'
import { useKeyring } from './useKeyring'
import { useObservable } from './useObservable'

interface UseSignAndSendTransactionParams {
  transaction: SubmittableExtrinsic<'rxjs'> | undefined
  signer: Address
  onDone: onTransactionDone
}

type TransactionStatus = 'READY' | 'SIGN' | 'EXTENSION' | 'PENDING' | 'SUCCESS' | 'ERROR'

const isError = (events: EventRecord[]) => {
  return events.find(({ event: { method } }) => {
    return method === 'ExtrinsicFailed' || method === 'BatchInterrupted'
  })
}

const observeTransaction = (
  transaction: Observable<ISubmittableResult>,
  setStatus: React.Dispatch<TransactionStatus>,
  setEvents: React.Dispatch<EventRecord[]>
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

      setEvents(events)
      setStatus(isError(events) ? 'ERROR' : 'SUCCESS')
    }
  }

  const errorHandler = () => setStatus('ERROR')

  transaction.subscribe(statusCallback, errorHandler)
}

export const useSignAndSendTransaction = ({ transaction, signer, onDone }: UseSignAndSendTransactionParams) => {
  const keyring = useKeyring()
  const { api } = useApi()

  const paymentInfo = useObservable(transaction?.paymentInfo(signer), [transaction, signer])
  const [status, setStatus] = useState<TransactionStatus>('READY')
  const [events, setEvents] = useState<EventRecord[]>([])

  useEffect(() => {
    if (status !== 'SIGN' || !transaction) {
      return
    }

    const keyringPair = keyring.getPair(signer)

    if (keyringPair.meta.isInjected) {
      setStatus('EXTENSION')
      web3FromAddress(signer).then((extension) => {
        observeTransaction(transaction.signAndSend(signer, { signer: extension.signer }), setStatus, setEvents)
      })
    } else {
      setStatus('PENDING')
      observeTransaction(transaction.signAndSend(keyringPair), setStatus, setEvents)
    }
  }, [api, status])

  useEffect(() => {
    if (status === 'SUCCESS' || status === 'ERROR') {
      onDone(status === 'SUCCESS', events, paymentInfo?.partialFee.toBn() || new BN(0))
    }
  }, [status])

  return {
    send: () => setStatus('SIGN'),
    paymentInfo,
    status,
  }
}
