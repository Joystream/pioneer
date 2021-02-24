import { useState } from 'react'
import { MemberFieldsFragment, useGetMembersQuery } from '../api/queries'

interface UseMembership {
  count: number
  members: MemberFieldsFragment[]
  isLoading: boolean
  active: MemberFieldsFragment | undefined
  setActive: (member: MemberFieldsFragment) => void
}

export function useMembership(): UseMembership {
  const { data, loading, error } = useGetMembersQuery()
  const [active, setActive] = useState<MemberFieldsFragment>()

  if (error) {
    console.error(error)
  }

  const count = data?.members.length ?? 0
  const members = data?.members ?? []

  return { count, members, isLoading: loading, active, setActive }
}
