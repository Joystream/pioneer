import { SubmittableExtrinsic } from '@polkadot/api/types'
import { web3FromAddress } from '@polkadot/extension-dapp'
import { Hash } from '@polkadot/types/interfaces/types'
import { ISubmittableResult } from '@polkadot/types/types'
import { useActor } from '@xstate/react'
import BN from 'bn.js'
import { useCallback, useEffect, useState } from 'react'
import { Observable } from 'rxjs'
import { ActorRef, Sender } from 'xstate'

import { info } from '../logger'
import { hasErrorEvent } from '../model/JoystreamNode'
import { Address } from '../types'

import { useObservable } from './useObservable'
import { useQueryNodeTransactionStatus } from './useQueryNodeTransactionStatus'
import { useTransactionStatus } from './useTransactionStatus'

interface UseSignAndSendTransactionParams {
  transaction: SubmittableExtrinsic<'rxjs'> | undefined
  signer: Address
  service: ActorRef<any>
}

const observeTransaction = (
  transaction: Observable<ISubmittableResult>,
  send: Sender<any>,
  fee: BN,
  setPending: (b: boolean) => void,
  setBlockHash: (h: string | Hash) => void
) => {
  const statusCallback = (result: ISubmittableResult) => {
    const { status, events } = result

    info(`Current transaction status: ${status.type}`)

    if (status.isReady) {
      send('PENDING')
      setPending(true)
    }

    if (status.isInBlock) {
      const hash = status.asInBlock
      info('Included at block hash', JSON.stringify(hash))
      info('Events:')
      info(JSON.stringify(events))
      setBlockHash(hash.toString())

      send(hasErrorEvent(events) ? 'ERROR' : 'FINALIZING')

      setPending(false)
    }

    if (status.isFinalized) {
      send({
        type: hasErrorEvent(events) ? 'ERROR' : 'PROCESSING',
        events,
        fee,
      })
    }
  }

  const errorHandler = () => send({ type: 'CANCELED', events: [] })

  transaction.subscribe({
    next: statusCallback,
    error: errorHandler,
  })
}

export const useSignAndSendTransaction = ({ transaction, signer, service }: UseSignAndSendTransactionParams) => {
  const [state, send] = useActor(service)
  const paymentInfo = useObservable(transaction?.paymentInfo(signer), [transaction, signer])
  const sign = useCallback(() => send('SIGN'), [service])
  const { setPending } = useTransactionStatus()

  const [blockHash, setBlockHash] = useState<Hash | string | undefined>(undefined)

  const queryNodeStatus = useQueryNodeTransactionStatus(blockHash)

  useEffect(() => {
    if (!state.matches('signing') || !transaction || !paymentInfo) {
      return
    }

    const fee = paymentInfo.partialFee.toBn()

    web3FromAddress(signer).then((extension) => {
      observeTransaction(
        transaction.signAndSend(signer, { signer: extension.signer }),
        send,
        fee,
        setPending,
        setBlockHash
      )
    })
    send('SIGN_EXTERNAL')
  }, [state.value.toString(), paymentInfo])

  useEffect(() => {
    if (!state.matches('processing')) {
      return
    }
    queryNodeStatus === 'confirmed' && send('SUCCESS')
  }, [state.value.toString(), queryNodeStatus])

  return {
    paymentInfo,
    sign,
    isReady: state.matches('prepare'),
  }
}
