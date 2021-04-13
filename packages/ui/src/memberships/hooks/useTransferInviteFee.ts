import { useMemo } from 'react'

import { useTransactionFee } from '../../accounts/hooks/useTransactionFee'
import { useApi } from '../../common/hooks/useApi'
import { MemberInternal } from '../types'

export function useTransferInviteFee(member?: MemberInternal) {
  const { api } = useApi()
  const transaction = useMemo(() => (member ? api?.tx?.members?.transferInvites(member.id, member.id, 1) : undefined), [
    member,
  ])

  return useTransactionFee(member?.controllerAccount, transaction)
}
