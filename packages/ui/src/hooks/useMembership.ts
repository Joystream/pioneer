import { useContext } from 'react'
import { useGetMembersQuery } from '../api/queries'
import { BaseMember } from '../common/types'
import { MembershipContext } from '../providers/membership/context'

interface UseMembership {
  count: number
  members: BaseMember[]
  isLoading: boolean
  active: BaseMember | undefined
  setActive: (member: BaseMember) => void
}

export function useMembership(): UseMembership {
  const { data, loading, error } = useGetMembersQuery()
  const { active, setActive } = useContext(MembershipContext)

  if (error) {
    console.error(error)
  }

  const count = data?.members.length ?? 0
  const members = data?.members ?? []

  return { count, members, isLoading: loading, active, setActive }
}
