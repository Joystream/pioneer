import { useContext } from 'react'

import { useAccounts } from '../../accounts/hooks/useAccounts'
import { MembershipContext } from '../providers/membership/context'
import { useGetMembersQuery } from '../queries'
import { asMember, MemberInternal } from '../types'

const POLL_INTERVAL = 5000

interface UseMembership {
  count: number
  members: MemberInternal[]
  isLoading: boolean
  active: MemberInternal | undefined
  setActive: (member: MemberInternal) => void
}

export function useMyMemberships(): UseMembership {
  const { allAccounts } = useAccounts()
  const addresses = allAccounts.map((account) => account.address)
  const options = {
    variables: { rootAccount_in: addresses, controllerAccount_in: addresses },
    pollInterval: POLL_INTERVAL,
  }
  const { data, loading, error } = useGetMembersQuery(options)
  const { active, setActive } = useContext(MembershipContext)

  if (error) {
    console.error(error)
  }

  const count = data?.memberships.length ?? 0
  const members = (data?.memberships ?? []).map(asMember)

  return { count, members, isLoading: loading, active, setActive }
}
