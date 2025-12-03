import { useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { useRoleAccount } from '@/working-groups/hooks/useRoleAccount'
import { GroupIdName, WorkerStatusToTypename } from '@/working-groups/types'

export const useIsLeadForGroup = (groupId: GroupIdName): boolean => {
  const { active } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const { roleAccount, isLoading } = useRoleAccount({
    membership: { id_eq: active?.id },
    group: { id_eq: groupId },
    isLead_eq: true,
    status_json: { isTypeOf_eq: WorkerStatusToTypename.active },
  })

  return useMemo(() => {
    if (isLoading || !roleAccount || !active) {
      return false
    }

    // Check if the lead worker's role account is in the user's accounts
    const accountAddresses = new Set(allAccounts.map((acc) => acc.address))
    return accountAddresses.has(roleAccount)
  }, [roleAccount, isLoading, allAccounts, active])
}
