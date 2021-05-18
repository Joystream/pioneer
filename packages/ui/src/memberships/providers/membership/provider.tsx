import React, { ReactNode, useMemo, useState } from 'react'

import { useAccounts } from '@/accounts/hooks/useAccounts'

import { useGetMembersQuery } from '../../queries'
import { asMember, Member } from '../../types'

import { MembershipContext } from './context'

interface Props {
  children: ReactNode
}

export interface MyMemberships {
  members: Member[]
  isLoading: boolean
  active: Member | undefined
  setActive: (member: Member) => void
}

const POLL_INTERVAL = 5000

export const MembershipContextProvider = (props: Props) => {
  const [active, setActive] = useState<Member>()

  const { allAccounts } = useAccounts()
  const addresses = allAccounts.map((account) => account.address)

  const { data, loading, error } = useGetMembersQuery({
    variables: { where: { rootAccount_in: addresses, controllerAccount_in: addresses } },
    pollInterval: POLL_INTERVAL,
  })

  if (error) {
    console.error(error)
  }

  const members = useMemo(() => (data?.memberships ?? []).map(asMember), [loading, JSON.stringify(data?.memberships)])

  const value = {
    active,
    setActive,
    members,
    isLoading: loading,
  }

  return <MembershipContext.Provider value={value}>{props.children}</MembershipContext.Provider>
}
