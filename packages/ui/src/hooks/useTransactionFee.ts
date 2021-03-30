import { useMemo } from 'react'
import { BaseMember } from '../common/types'
import { useApi } from './useApi'
import { useBalance } from './useBalance'
import { useObservable } from './useObservable'

export function useTransactionFee(member: BaseMember) {
  const { api } = useApi()
  const transaction = useMemo(() => api?.tx?.members?.transferInvites(member.id, member.id, 1), [member])
  const paymentInfo = useObservable(transaction?.paymentInfo(member.controllerAccount), [transaction, member])
  const balance = useBalance({ name: '', address: member.controllerAccount })
  return useMemo(() => balance && paymentInfo && balance.transferable.gte(paymentInfo.partialFee), [
    balance,
    paymentInfo,
  ])
}
