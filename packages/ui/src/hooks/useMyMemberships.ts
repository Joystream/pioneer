import { useContext, useEffect } from 'react'
import { useGetMembersLazyQuery } from '../api/queries'
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
  const { hasAccounts, allAccounts } = useAccounts()
  const addresses = allAccounts.map((account) => account.address)
  const options = hasAccounts ? { variables: { rootAccount_in: addresses } } : undefined
  const [load, { called, data, loading, error }] = useGetMembersLazyQuery(options)
  const { active, setActive } = useContext(MembershipContext)

  console.log('useMyMemberships', hasAccounts)

  useEffect(() => {
    hasAccounts && !called && load()
  }, [hasAccounts])

  if (error) {
    console.error(error)
  }

  const count = data?.members.length ?? 0
  const members = data?.members ?? []

  return { count, members, isLoading: !called || loading, active, setActive }
}
