import { useContext } from 'react'

import { useAccounts } from '../../accounts/hooks/useAccounts'
import { BaseMember } from '../../common/types'
import { MembershipContext } from '../providers/membership/context'
import { useGetMembersQuery } from '../queries'

const POLL_INTERVAL = 5000

interface UseMembership {
  count: number
  members: BaseMember[]
  isLoading: boolean
  active: BaseMember | undefined
  setActive: (member: BaseMember) => void
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
  const members = data?.memberships ?? []

  return { count, members, isLoading: loading, active, setActive }
}
