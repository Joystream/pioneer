import { SubmittableExtrinsic } from '@polkadot/api/types'
import { web3FromAddress } from '@polkadot/extension-dapp'
import { EventRecord } from '@polkadot/types/interfaces/system'
import { ISubmittableResult } from '@polkadot/types/types'
import { useActor } from '@xstate/react'
import { useEffect } from 'react'
import { Observable } from 'rxjs'
import { ActorRef, Sender } from 'xstate'

import { info } from '@/common/logger'

import { Address } from '../types'

import { useApi } from './useApi'
import { useKeyring } from './useKeyring'
import { useObservable } from './useObservable'

interface UseSignAndSendTransactionParams {
  transaction: SubmittableExtrinsic<'rxjs'> | undefined
  signer: Address
  service: ActorRef<any>
}

export const isError = (events: EventRecord[]): boolean => {
  return !!events.find(({ event: { method } }) => {
    return method === 'ExtrinsicFailed' || method === 'BatchInterrupted'
  })
}

const observeTransaction = (transaction: Observable<ISubmittableResult>, send: Sender<any>) => {
  const statusCallback = (result: ISubmittableResult) => {
    const { status, events } = result

    info(`Current transaction status: ${status.type}`)

    if (status.isReady) {
      send('PENDING')
    }

    if (status.isInBlock) {
      info('Included at block hash', JSON.stringify(status.asInBlock))
      info('Events:')

      events.forEach(({ event: { data, method, section }, phase }) => {
        info('\t', JSON.stringify(phase), `: ${section}.${method}`, JSON.stringify(data))
      })
      info(JSON.stringify(events))

      send({
        type: isError(events) ? 'ERROR' : 'SUCCESS',
        events,
      })
    }
  }

  const errorHandler = () => send({ type: 'ERROR', payload: {} })

  transaction.subscribe(statusCallback, errorHandler)
}

export const useSignAndSendTransaction = ({ transaction, signer, service }: UseSignAndSendTransactionParams) => {
  const keyring = useKeyring()
  const { api } = useApi()

  const paymentInfo = useObservable(transaction?.paymentInfo(signer), [transaction, signer])
  const [state, send] = useActor(service)

  useEffect(() => {
    if (!state.matches('signing') || !transaction) {
      return
    }

    const keyringPair = keyring.getPair(signer)

    if (keyringPair.meta.isInjected) {
      send('SIGN_EXTENSION')
      web3FromAddress(signer).then((extension) => {
        observeTransaction(transaction.signAndSend(signer, { signer: extension.signer }), send)
      })
    } else {
      send('SIGN_INTERNAL')
      observeTransaction(transaction.signAndSend(keyringPair), send)
    }
  }, [api, state.value.toString()])

  return {
    paymentInfo,
  }
}
