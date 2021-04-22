import { useContext } from 'react'

import { useAccounts } from '../../accounts/hooks/useAccounts'
import { MembershipContext } from '../providers/membership/context'
import { useGetMembersQuery } from '../queries'
import { asMember, Member } from '../types'

const POLL_INTERVAL = 5000

interface UseMembership {
  members: Member[]
  isLoading: boolean
  active: Member | undefined
  setActive: (member: Member) => void
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

  const members = (data?.memberships ?? []).map(asMember)

  return { members, isLoading: loading, active, setActive }
}
