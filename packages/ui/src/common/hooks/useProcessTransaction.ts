import { SubmittableExtrinsic } from '@polkadot/api/types'
import { Hash } from '@polkadot/types/interfaces/types'
import { ISubmittableResult } from '@polkadot/types/types'
import { useActor } from '@xstate/react'
import BN from 'bn.js'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { Observable } from 'rxjs'
import { ActorRef, Sender } from 'xstate'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'

import { error, info } from '../logger'
import { hasErrorEvent } from '../model/JoystreamNode'
import { Address } from '../types'

import { useNetworkEndpoints } from './useNetworkEndpoints'
import { useObservable } from './useObservable'
import { useTransactionStatus } from './useTransactionStatus'

type SetBlockHash = Dispatch<SetStateAction<string | Hash | undefined>>

interface UseSignAndSendTransactionParams {
  transaction: SubmittableExtrinsic<'rxjs'> | undefined
  signer: Address
  service: ActorRef<any>
  setBlockHash?: SetBlockHash
}

const observeTransaction = (
  transaction: Observable<ISubmittableResult>,
  send: Sender<any>,
  fee: BN,
  nodeRpcEndpoint: string,
  setBlockHash?: SetBlockHash
) => {
  const statusCallback = (result: ISubmittableResult) => {
    const { status, events } = result

    if (status.isReady) {
      send('PENDING')
    }

    if (status.isInBlock) {
      const hash = status.asInBlock.toString()
      const transactionInfo = [
        events.map((event) => event.event.method).join(', '),
        `on network: ${nodeRpcEndpoint}`,
        `in block: ${hash}`,
        `more details at: https://polkadot.js.org/apps/?rpc=${nodeRpcEndpoint}#/explorer/query/${hash}`,
      ].join('\n')

      setBlockHash && setBlockHash(hash)

      if (hasErrorEvent(events)) {
        subscription.unsubscribe()
        send({ type: 'ERROR', events })
        error('Transaction error:', transactionInfo)
      } else {
        send({ type: 'FINALIZING', fee })
        info('Successful transaction:', transactionInfo)
      }
    }

    if (status.isFinalized) {
      if (hasErrorEvent(events)) {
        subscription.unsubscribe()
        send({ type: 'ERROR', events })
      } else {
        send({ type: 'PROCESSING', events })
      }
    }
  }

  const errorHandler = (error: string | Error) => {
    subscription.unsubscribe()

    if (error === 'Cancelled') {
      return send({ type: 'CANCELED', events: [] })
    }

    const errorMessage = (error as any).message ?? String(error)
    const errorData = {
      error: errorMessage.startsWith('1010:')
        ? {
            docs: 'Insufficient funds to cover fees. Transaction has been canceled.',
            section: 'transaction',
            name: 'Fees',
          }
        : { docs: errorMessage, section: 'transaction', name: 'SignAndSend' },
    }

    send({ type: 'ERROR', events: [{ event: { method: 'TransactionCanceled', data: [errorData] } }] })
  }

  const subscription = transaction.subscribe({
    next: statusCallback,
    error: errorHandler,
  })
}

export const useProcessTransaction = ({
  transaction,
  signer,
  service,
  setBlockHash,
}: UseSignAndSendTransactionParams) => {
  const [state, send] = useActor(service)
  const paymentInfo = useObservable(() => transaction?.paymentInfo(signer), [transaction, signer])
  const { setService } = useTransactionStatus()
  const [endpoints] = useNetworkEndpoints()
  const { allAccounts, wallet } = useMyAccounts()

  useEffect(() => {
    setService(service)
  }, [])

  useEffect(() => {
    const hasSigner = allAccounts.find((acc) => acc.address === signer)

    if (!state.matches('signing') || !transaction || !paymentInfo || !hasSigner) {
      return
    }

    const fee = paymentInfo.partialFee.toBn()

    observeTransaction(
      transaction.signAndSend(signer, { signer: wallet?.signer }),
      send,
      fee,
      endpoints.nodeRpcEndpoint,
      setBlockHash
    )

    send('SIGN_EXTERNAL')
  }, [state.value.toString(), paymentInfo, wallet])

  return {
    send,
    paymentInfo,
    isReady: state.matches('prepare'),
    isProcessing: state.matches('processing'),
  }
}
