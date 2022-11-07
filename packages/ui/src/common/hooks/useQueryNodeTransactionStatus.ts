import { Hash } from '@polkadot/types/interfaces/runtime'
import { useEffect, useState } from 'react'

import { useBlockHash } from './useBlockHash'
import { useQueryNodeStateSubscription } from './useQueryNode'

type TransactionStatus = 'confirmed' | 'rejected' | 'unknown'

export function useQueryNodeTransactionStatus(isProcessing: boolean, blockHash?: Hash | string, skip?: boolean) {
  const { queryNodeState } = useQueryNodeStateSubscription({ shouldResubscribe: true, skip })
  const [status, setStatus] = useState<TransactionStatus>('unknown')
  const queryNodeBlockHash = useBlockHash(queryNodeState?.indexerHead)
  useEffect(() => {
    if (!queryNodeState && isProcessing) {
      const timeout = setTimeout(() => {
        setStatus('confirmed')
      }, 10_000)

      return () => clearTimeout(timeout)
    }
  }, [!queryNodeState, isProcessing])

  useEffect(() => {
    if (queryNodeState) {
      setStatus(blockHash === queryNodeBlockHash ? 'confirmed' : 'rejected')
    }
  }, [queryNodeState, queryNodeBlockHash])

  return status
}
