import { Hash } from '@polkadot/types/interfaces/runtime'
import { useEffect, useState } from 'react'

import { useQueryNodeState } from '@/common/hooks/useQueryNodeState'

import { useBlockHash } from './useBlockHash'

type TransactionStatus = 'confirmed' | 'rejected' | 'unknown'

export function useQueryNodeTransactionStatus(blockHash?: Hash | string) {
  const { queryNodeState } = useQueryNodeState()
  const [status, setStatus] = useState<TransactionStatus>('unknown')
  const queryNodeBlockHash = useBlockHash(queryNodeState?.indexerHead)

  useEffect(() => {
    if (!queryNodeState) {
      const timeout = setTimeout(() => {
        setStatus('confirmed')
      }, 10_000)

      return () => clearTimeout(timeout)
    }
  }, [!queryNodeState])

  useEffect(() => {
    if (queryNodeState) {
      setStatus(blockHash === queryNodeBlockHash ? 'confirmed' : 'rejected')
    }
  }, [queryNodeState, queryNodeBlockHash])

  return status
}
