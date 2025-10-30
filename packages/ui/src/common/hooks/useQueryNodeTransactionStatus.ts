import { Hash } from '@polkadot/types/interfaces/runtime'
import { useEffect, useState } from 'react'

import { warning } from '../logger'

import { useBlockHash } from './useBlockHash'
import { useQueryNodeStateSubscription } from './useQueryNode'

type TransactionStatus = 'confirmed' | 'rejected' | 'unknown'

export function useQueryNodeTransactionStatus(
  isProcessing: boolean,
  blockHashOrNumber?: Hash | string | number,
  skip?: boolean
) {
  const { queryNodeState } = useQueryNodeStateSubscription({ shouldResubscribe: true, skip })
  const [status, setStatus] = useState<TransactionStatus>('unknown')
  const queryNodeIndexerHeadHash = useBlockHash(queryNodeState?.indexerHead)
  useEffect(() => {
    if (isProcessing) {
      const timeout = setTimeout(() => {
        warning('QN sync timeout')
        setStatus('confirmed')
      }, 15_000)

      return () => clearTimeout(timeout)
    }
  }, [isProcessing])

  useEffect(() => {
    if (queryNodeState && blockHashOrNumber) {
      let isSynced = false
      if (typeof blockHashOrNumber === 'number') {
        isSynced = parseInt(queryNodeState.lastCompleteBlock) >= blockHashOrNumber
      } else {
        isSynced = blockHashOrNumber === queryNodeIndexerHeadHash
      }

      if (isSynced) {
        setStatus('confirmed')
      }
    }
  }, [queryNodeState, blockHashOrNumber, queryNodeIndexerHeadHash])

  return status
}
