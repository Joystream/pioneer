import { useContext } from 'react'
import { useGetMembersQuery } from '../api/queries'
import { BaseMember } from '../common/types'
import { MembershipContext } from '../providers/membership/context'
import { useAccounts } from './useAccounts'

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
  const options = { variables: { rootAccount_in: addresses, controllerAccount_in: addresses } }
  const { data, loading, error } = useGetMembersQuery(options)
  const { active, setActive } = useContext(MembershipContext)

  if (error) {
    console.error(error)
  }

  const count = data?.members.length ?? 0
  const members = data?.members ?? []

  return { count, members, isLoading: loading, active, setActive }
}
