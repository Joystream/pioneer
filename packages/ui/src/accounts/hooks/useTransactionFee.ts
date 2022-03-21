import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import { useMemo } from 'react'

import { useObservable } from '@/common/hooks/useObservable'
import { Address } from '@/common/types'
import { whenDefined } from '@/common/utils'

import { useBalance } from './useBalance'

export function useTransactionFee(address?: Address, transaction?: SubmittableExtrinsic<'rxjs', ISubmittableResult>) {
  const paymentInfo = useObservable(
    whenDefined(address, (address) => transaction?.paymentInfo(address)),
    [transaction, address]
  )
  const balance = useBalance(address)
  return useMemo(
    () =>
      balance && paymentInfo
        ? {
            transactionFee: paymentInfo.partialFee,
            canAfford: balance.transferable.gte(paymentInfo.partialFee),
          }
        : undefined,
    [balance, paymentInfo]
  )
}
