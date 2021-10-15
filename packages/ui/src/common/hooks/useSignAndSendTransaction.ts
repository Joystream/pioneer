import { SubmittableExtrinsic } from '@polkadot/api/types'
import { web3FromAddress } from '@polkadot/extension-dapp'
import { ISubmittableResult } from '@polkadot/types/types'
import { useActor } from '@xstate/react'
import BN from 'bn.js'
import { useCallback, useEffect } from 'react'
import { Observable } from 'rxjs'
import { ActorRef, Sender } from 'xstate'

import { info } from '../logger'
import { hasError } from '../model/apiErrors'
import { Address } from '../types'

import { useObservable } from './useObservable'

interface UseSignAndSendTransactionParams {
  transaction: SubmittableExtrinsic<'rxjs'> | undefined
  signer: Address
  service: ActorRef<any>
}

const observeTransaction = (transaction: Observable<ISubmittableResult>, send: Sender<any>, fee: BN) => {
  const statusCallback = (result: ISubmittableResult) => {
    const { status, events } = result

    info(`Current transaction status: ${status.type}`)

    if (status.isReady) {
      send('PENDING')
    }

    if (status.isInBlock) {
      info('Included at block hash', JSON.stringify(status.asInBlock))
      info('Events:')
      info(JSON.stringify(events))

      send({
        type: hasError(events) ? 'ERROR' : 'SUCCESS',
        events,
        fee,
      })
    }
  }

  const errorHandler = () => send({ type: 'ERROR', events: [] })

  transaction.subscribe(statusCallback, errorHandler)
}

export const useSignAndSendTransaction = ({ transaction, signer, service }: UseSignAndSendTransactionParams) => {
  const [state, send] = useActor(service)
  const paymentInfo = useObservable(transaction?.paymentInfo(signer), [transaction, signer])
  const sign = useCallback(() => send('SIGN'), [service])

  useEffect(() => {
    if (!state.matches('signing') || !transaction || !paymentInfo) {
      return
    }

    const fee = paymentInfo.partialFee.toBn()

    web3FromAddress(signer).then((extension) => {
      observeTransaction(transaction.signAndSend(signer, { signer: extension.signer }), send, fee)
    })
    send('SIGN_EXTERNAL')
  }, [state.value.toString(), paymentInfo])

  return {
    paymentInfo,
    sign,
    isReady: state.matches('prepare'),
  }
}
