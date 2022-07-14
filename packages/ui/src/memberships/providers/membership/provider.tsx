import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { error } from '@/common/logger'
import { Address } from '@/common/types'

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
  setActive: (member: Member | undefined) => void
  helpers: {
    getMemberIdByBoundAccountAddress: (address: Address) => Member['id'] | undefined
  }
}

export const MembershipContextProvider = (props: Props) => {
  const [active, setActive] = useState<Member>()
  const [recentMembership, setRecentMembership] = useLocalStorage<string>('recentMembership')

  const { allAccounts, isLoading: isLoadingAccounts } = useMyAccounts()
  const addresses = allAccounts.map((account) => account.address)

  const setActiveMembership = useCallback((active: Member | undefined) => {
    setActive(active)
    setRecentMembership(active ? active.id : '')
  }, [])

  const {
    data,
    loading,
    error: err,
  } = useGetMembersQuery({
    variables: { where: { controllerAccount_in: addresses } },
    skip: addresses.length < 1,
  })

  if (err) {
    error(err)
  }

  const members = useMemo(() => (data?.memberships ?? []).map(asMember), [loading, JSON.stringify(data?.memberships)])

  useEffect(() => {
    if (recentMembership) {
      const membership = members.find((member) => member.id === recentMembership)

      membership && setActive(membership)
    }
  }, [recentMembership, members])

  const boundAccountsMap: { [index: Address]: Member['id'] } = useMemo(
    () =>
      members.reduce((prevMember, nextMember) => {
        const toAdd = nextMember.boundAccounts.reduce(
          (prevAddress, nextAddress) => ({
            ...prevAddress,
            [nextAddress]: nextMember.id,
          }),
          {}
        )
        return {
          ...prevMember,
          ...toAdd,
        }
      }, {}),
    [members]
  )

  const getMemberIdByBoundAccountAddress = useCallback(
    (address: Address) => boundAccountsMap[address],
    [boundAccountsMap]
  )

  const value = {
    active,
    setActive: setActiveMembership,
    members,
    hasMembers: !!members.length,
    isLoading: loading || isLoadingAccounts,
    helpers: {
      getMemberIdByBoundAccountAddress,
    },
  }

  return <MembershipContext.Provider value={value}>{props.children}</MembershipContext.Provider>
}
