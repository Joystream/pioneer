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

const isCancelledMessage = (error: unknown) => {
  if (!error) return false

  if (error === 'Cancelled') return true

  const message = typeof error === 'string' ? error : (error as Error)?.message || String(error)
  if (!message) {
    return false
  }
  const normalized = message.toLowerCase()
  return normalized.includes('cancelled') || normalized.includes('canceled')
}

const observeTransaction = (
  transaction: Observable<ISubmittableResult>,
  send: Sender<any>,
  fee: BN,
  nodeRpcEndpoint: string,
  setBlockHash?: SetBlockHash
) => {
  let hasReceivedStatus = false
  let subscription: { unsubscribe: () => void } | null = null

  const statusCallback = (result: ISubmittableResult) => {
    hasReceivedStatus = true
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
        if (subscription) {
          subscription.unsubscribe()
          subscription = null
        }
        send({ type: 'ERROR', events })
        error('Transaction error:', transactionInfo)
      } else {
        send({ type: 'FINALIZING', fee })
        info('Successful transaction:', transactionInfo)
      }
    }

    if (status.isFinalized) {
      if (hasErrorEvent(events)) {
        if (subscription) {
          subscription.unsubscribe()
          subscription = null
        }
        send({ type: 'ERROR', events })
      } else {
        send({ type: 'PROCESSING', events })
      }
    }
  }

  const errorHandler = (error: string | Error | unknown) => {
    if (subscription) {
      subscription.unsubscribe()
      subscription = null
    }

    const isCancelled = isCancelledMessage(error) || error === 'Cancelled' || (error as Error)?.message === 'Cancelled'

    if (isCancelled) {
      send({ type: 'CANCELED', events: [] })
      return
    }

    const errorMessage = (error as any)?.message ?? String(error)
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

  const completeHandler = () => {
    if (subscription) {
      subscription.unsubscribe()
      subscription = null
    }

    if (!hasReceivedStatus) {
      setTimeout(() => {
        if (!hasReceivedStatus) {
          send({ type: 'CANCELED', events: [] })
        }
      }, 200)
    }
  }

  subscription = transaction.subscribe({
    next: statusCallback,
    error: errorHandler,
    complete: completeHandler,
  })

  return subscription
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

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason
      const isCancelled = isCancelledMessage(error)

      if (isCancelled) {
        event.preventDefault()
        if (
          state.matches('signing') ||
          state.matches('signWithExtension') ||
          state.matches('prepare') ||
          state.matches('pending')
        ) {
          send({ type: 'CANCELED', events: [] })
        }
      }
    }

    const handleError = (event: ErrorEvent) => {
      const error = event.error || event.message
      const isCancelled = isCancelledMessage(error)

      if (isCancelled) {
        event.preventDefault()
        if (
          state.matches('signing') ||
          state.matches('signWithExtension') ||
          state.matches('prepare') ||
          state.matches('pending')
        ) {
          send({ type: 'CANCELED', events: [] })
        }
      }
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      window.removeEventListener('error', handleError)
    }
  }, [service, state, send])

  useEffect(() => {
    const hasSigner = allAccounts.find((acc) => acc.address === signer)

    if (!state.matches('signing') || !transaction || !paymentInfo || !hasSigner) {
      return
    }

    const fee = paymentInfo.partialFee.toBn()

    try {
      const txObservable = transaction.signAndSend(signer, { signer: wallet?.signer })

      observeTransaction(txObservable, send, fee, endpoints.nodeRpcEndpoint, setBlockHash)

      send('SIGN_EXTERNAL')
    } catch (err) {
      const isCancelled = isCancelledMessage(err) || err === 'Cancelled' || (err as Error)?.message === 'Cancelled'

      if (isCancelled) {
        send({ type: 'CANCELED', events: [] })
      } else {
        const errorMessage = (err as any)?.message ?? String(err)
        send({
          type: 'ERROR',
          events: [{ event: { method: 'TransactionFailed', data: [{ error: errorMessage }] } }],
        })
      }
    }
  }, [state.value.toString(), paymentInfo, wallet, state])

  return {
    send,
    paymentInfo,
    isReady: state.matches('prepare'),
    isProcessing: state.matches('processing'),
  }
}
