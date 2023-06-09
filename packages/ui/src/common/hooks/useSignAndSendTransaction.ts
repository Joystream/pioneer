import { useApolloClient } from '@apollo/client'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { Hash } from '@polkadot/types/interfaces/types'
import BN from 'bn.js'
import { useCallback, useEffect, useState } from 'react'
import { ActorRef } from 'xstate'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/api/hooks/useApi'
import { getChainMetadata } from '@/api/utils/getChainMetadata'
import { BN_ZERO } from '@/common/constants'
import { getFeeSpendableBalance } from '@/common/providers/transactionFees/provider'

import { Address } from '../types'

import { useProcessTransaction } from './useProcessTransaction'
import { useQueryNodeTransactionStatus } from './useQueryNodeTransactionStatus'

interface Params {
  transaction: SubmittableExtrinsic<'rxjs'> | undefined
  signer: Address
  service: ActorRef<any>
  skipQueryNode?: boolean
  extraCosts?: BN
}

// Transactions which emit events handled by QueryNode use useSignAndSendTransaction w/o skipQueryNode parameter,
// it will wait for QueryNode confirmation on PROCESSING stage.
// Other transactions use skipQueryNode with true value which automatically switch
// from PROCESSING state to SUCCESS/ERROR.

export const useSignAndSendTransaction = ({
  transaction,
  signer,
  service,
  skipQueryNode = false,
  extraCosts = BN_ZERO,
}: Params) => {
  const [blockHash, setBlockHash] = useState<Hash | string | undefined>(undefined)
  const apolloClient = useApolloClient()
  const balance = useBalance(signer)
  const { send, paymentInfo, isReady, isProcessing } = useProcessTransaction({
    transaction,
    signer,
    service,
    setBlockHash,
  })
  const queryNodeStatus = useQueryNodeTransactionStatus(isProcessing, blockHash, skipQueryNode)
  const { wallet } = useMyAccounts()
  const { api } = useApi()

  const sign = useCallback(() => {
    if (wallet && api) {
      return getChainMetadata(api).then(async (metadata) => {
        await wallet.updateMetadata(metadata)
        send('SIGN')
      })
    }
    send('SIGN')
  }, [service, wallet])

  useEffect(() => {
    if (skipQueryNode && isProcessing) {
      send('SUCCESS')
    }

    if (!skipQueryNode && queryNodeStatus === 'confirmed' && isProcessing) {
      send('SUCCESS')

      apolloClient.refetchQueries({ include: 'active' })
    }
  }, [isProcessing, skipQueryNode, queryNodeStatus])

  return {
    paymentInfo,
    sign,
    isReady,
    canAfford: Boolean(
      balance && paymentInfo && getFeeSpendableBalance(balance).gte(paymentInfo.partialFee.add(extraCosts))
    ),
  }
}
