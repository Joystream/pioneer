import { useMemo } from 'react'

import { useApi } from '../../common/hooks/useApi'
import { useTransactionFee } from '../../common/hooks/useTransactionFee'
import { BaseMember } from '../../common/types'

export function useTransferInviteFee(member?: BaseMember) {
  const { api } = useApi()
  const transaction = useMemo(() => (member ? api?.tx?.members?.transferInvites(member.id, member.id, 1) : undefined), [
    member,
  ])

  return useTransactionFee(member?.controllerAccount, transaction)
}
