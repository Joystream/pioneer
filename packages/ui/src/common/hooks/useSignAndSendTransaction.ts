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
}

export const useSignAndSendQueryNodeTransaction = ({ transaction, signer, service }: Params) => {
  const [blockHash, setBlockHash] = useState<Hash | string | undefined>(undefined)
  const queryNodeStatus = useQueryNodeTransactionStatus(blockHash)
  const { send, paymentInfo, isReady, isProcessing } = useProcessTransaction({transaction, signer, service, setBlockHash})
  
  const sign = useCallback(() => send('SIGN'), [service])

  useEffect(() => {
    if (!isProcessing) {
      return
    }
    queryNodeStatus === 'confirmed' && send('SUCCESS')
  }, [isProcessing, queryNodeStatus])

  return {
    paymentInfo,
    sign,
    isReady,
  }
}

export const useSignAndSendTransaction = ({ transaction, signer, service }: Params) => {
  const { send, paymentInfo, isReady, isProcessing } = useProcessTransaction({transaction, signer, service})
  
  const sign = useCallback(() => send('SIGN'), [service])

  useEffect(() => {
    if (isProcessing) {
      send('SUCCESS')
    }
  }, [isProcessing])

  return {
    paymentInfo,
    sign,
    isReady,
  }
}
