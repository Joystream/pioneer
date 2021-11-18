import { Hash } from '@joystream/types/common'
import { useEffect, useState } from 'react'

import { info } from '../logger'

import { useBlockHash } from './useBlockHash'
import { useQueryNodeStateSubscription } from './useQueryNode'

type TransactionStatus = 'confirmed' | 'rejected' | 'unknown'

export function useQueryNodeTransactionStatus(blockHash?: Hash | string) {
  const { queryNodeState, error: queryNodeStateError } = useQueryNodeStateSubscription()
  const [status, setStatus] = useState<TransactionStatus>('unknown')
  const queryNodeBlockHash = useBlockHash(queryNodeState?.indexerHead)

  useEffect(() => {
    if (!queryNodeStateError) {
      return
    }
    info('Failed to subscribe to query node state')
  }, [queryNodeStateError])

  useEffect(() => {
    if (queryNodeState) {
      setStatus(blockHash === queryNodeBlockHash ? 'confirmed' : 'rejected')
    }
  }, [queryNodeState, queryNodeBlockHash])
  
  return status
}
