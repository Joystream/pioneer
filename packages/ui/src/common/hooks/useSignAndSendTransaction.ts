import { ObservableQuery, useApolloClient } from '@apollo/client'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { Hash } from '@polkadot/types/interfaces/types'
import { useCallback, useEffect, useState } from 'react'
import { ActorRef } from 'xstate'

import { Address } from '../types'

import { useProcessTransaction } from './useProcessTransaction'
import { useQueryNodeTransactionStatus } from './useQueryNodeTransactionStatus'

interface Params {
  transaction: SubmittableExtrinsic<'rxjs'> | undefined
  signer: Address
  service: ActorRef<any>
  skipQueryNode?: boolean
}

// Transactions which emit events handled by QueryNode use useSignAndSendTransaction w/o skipQueryNode parameter,
// it will wait for QueryNode confirmation on PROCESSING stage.
// Other transactions use skipQueryNode with true value which automatically switch
// from PROCESSING state to SUCCESS/ERROR.

export const useSignAndSendTransaction = ({ transaction, signer, service, skipQueryNode = false }: Params) => {
  const [blockHash, setBlockHash] = useState<Hash | string | undefined>(undefined)
  const [queriesMountedOnInvoke, setQueriesMountedOnInvoke] = useState<ObservableQuery[]>([])
  const queryNodeStatus = useQueryNodeTransactionStatus(blockHash, skipQueryNode)
  const apolloClient = useApolloClient()

  const { send, paymentInfo, isReady, isProcessing } = useProcessTransaction({
    transaction,
    signer,
    service,
    setBlockHash,
  })

  const sign = useCallback(() => send('SIGN'), [service])

  useEffect(() => {
    if (skipQueryNode && isProcessing) {
      send('SUCCESS')
    }

    if (!skipQueryNode && queryNodeStatus === 'confirmed' && isProcessing) {
      send('SUCCESS')

      queriesMountedOnInvoke.forEach((query) => query.refetch())
    }
  }, [isProcessing, skipQueryNode, queryNodeStatus])

  useEffect(() => {
    const mountedQueries = apolloClient.getObservableQueries('active')

    setQueriesMountedOnInvoke(Array.from(mountedQueries).map(([, query]) => query))
  }, [])

  return {
    paymentInfo,
    sign,
    isReady,
  }
}
