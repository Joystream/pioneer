import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import { useMemo } from 'react'
import { Address } from '../common/types'
import { useBalance } from './useBalance'
import { useObservable } from './useObservable'

export function useTransactionFee(address?: Address, transaction?: SubmittableExtrinsic<'rxjs', ISubmittableResult>) {
  const paymentInfo = useObservable(transaction?.paymentInfo(address || ''), [transaction, address])
  const balance = useBalance({ name: '', address: address || '' })

  return useMemo(() => balance && paymentInfo && balance.transferable.gte(paymentInfo.partialFee), [
    balance,
    paymentInfo,
  ])
}
