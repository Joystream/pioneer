import { useMemo } from 'react'

import { useTransactionFee } from '../../accounts/hooks/useTransactionFee'
import { useApi } from '../../common/hooks/useApi'
import { Member } from '../types'

export function useTransferInviteFee(member?: Member) {
  const { api, connectionState } = useApi()
  const transaction = useMemo(() => {
    return member ? api?.tx?.members?.transferInvites(member.id, member.id, 1) : undefined
  }, [member, connectionState])

  return useTransactionFee(member?.controllerAccount, transaction)
}
