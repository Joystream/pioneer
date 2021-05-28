import React, { ReactNode, useMemo, useState } from 'react'

import { useAccounts } from '@/accounts/hooks/useAccounts'
import { error } from '@/common/logger'

import { useGetMembersQuery } from '../../queries'
import { asMember, Member } from '../../types'

import { MembershipContext } from './context'

interface Props {
  children: ReactNode
}

export interface MyMemberships {
  members: Member[]
  hasMembers: boolean
  isLoading: boolean
  active: Member | undefined
  setActive: (member: Member) => void
}

const POLL_INTERVAL = 10_000

export const MembershipContextProvider = (props: Props) => {
  const [active, setActive] = useState<Member>()

  const { allAccounts } = useAccounts()
  const addresses = allAccounts.map((account) => account.address)

  const { data, loading, error: err } = useGetMembersQuery({
    variables: { where: { rootAccount_in: addresses, controllerAccount_in: addresses } },
    pollInterval: POLL_INTERVAL,
  })

  if (err) {
    error(err)
  }

  const members = useMemo(() => (data?.memberships ?? []).map(asMember), [loading, JSON.stringify(data?.memberships)])

  const value = {
    active,
    setActive,
    members,
    hasMembers: !!members.length,
    isLoading: loading,
  }

  return <MembershipContext.Provider value={value}>{props.children}</MembershipContext.Provider>
}
