import { useMemo } from 'react'
import { BaseMember } from '../common/types'
import { useApi } from './useApi'
import { useTransactionFee } from './useTransactionFee'

export function useTransferInviteFee(member?: BaseMember) {
  const { api } = useApi()
  const transaction = useMemo(() => (member ? api?.tx?.members?.transferInvites(member.id, member.id, 1) : undefined), [
    member,
  ])

  return useTransactionFee(member?.controllerAccount, transaction)
}
