import BN from 'bn.js'
import { isFunction, isObject, isString, mapValues } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { Account, AddressToBalanceMap, LockType } from '@/accounts/types'
import { asBN, whenDefined } from '@/common/utils'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { Member, asMember } from '@/memberships/types'

import { Membership } from '../data/members'
import { joy } from '../helpers'

type Balance = number | string | BN

type BalanceLock = LockType | { amount: Balance; type: LockType }
type DeriveBalancesVesting = {
  startingBlock: Balance
  endBlock: Balance
  perBlock: Balance
  locked: Balance
  vested: Balance
}
type Balances = {
  total?: Balance
  locked?: Balance
  recoverable?: Balance
  transferable?: Balance
  locks?: BalanceLock[]
  vesting?: DeriveBalancesVesting[]
  vestingTotal?: Balance
  vestedClaimable?: Balance
  vestedBalance?: Balance
  vestingLocked?: Balance
}

type AccountMock = {
  balances?: Balances
  address?: string
  member?: Membership
}

type AccountsParam = { active?: Membership | Membership['id']; list?: AccountMock[] } | undefined

export type Context = { args: any; parameters: { accounts?: AccountsParam | ((args: any) => AccountsParam) } }

export const AccountsDecorator = (Story: CallableFunction, { args, parameters }: Context) => {
  const [allAccounts, setAllAccounts] = useState<Account[]>([])
  const [balances, setBalances] = useState<AddressToBalanceMap>({})
  const [members, setMembers] = useState<MyMemberships['members']>([])
  const [active, setActive] = useState<Member | undefined>()

  const params = useMemo(
    () => (isFunction(parameters.accounts) ? parameters.accounts(args) : parameters.accounts),
    [isFunction(parameters.accounts) && args]
  )

  useEffect(() => {
    const list = params?.list ?? (params && isObject(params.active) ? [{ member: params.active }] : undefined)
    if (!list) return

    const accountData = list.flatMap(
      ({ balances, member, address = member?.controllerAccount }) =>
        whenDefined(address, (address) => ({ address, balances, member })) ?? []
    )

    const allAccounts: Account[] = accountData.map(({ address, member }) => ({ address, name: member?.handle }))

    const balances: AddressToBalanceMap = Object.fromEntries(
      accountData.map(({ address, balances }) => {
        const locks =
          balances?.locks?.map((lock) =>
            isString(lock) ? { amount: asBalance(1), type: lock } : { amount: asBalance(lock.amount), type: lock.type }
          ) ?? []

        const vesting = balances?.vesting?.map((schedule) => mapValues(schedule, asBalance)) ?? []

        return [
          address,
          {
            total: asBalance(balances?.total),
            locked: asBalance(balances?.locked),
            recoverable: asBalance(balances?.recoverable),
            transferable: asBalance(balances?.transferable),
            locks,
            vesting,
            vestingTotal: asBalance(balances?.vestingTotal),
            vestedClaimable: asBalance(balances?.vestedClaimable),
            vestedBalance: asBalance(balances?.vestedBalance),
            vestingLocked: asBalance(balances?.vestingLocked),
          },
        ]
      })
    )

    const members = accountData.flatMap(({ member }) => whenDefined(member, asMember) ?? [])

    const active = whenDefined(params?.active, (active) =>
      isObject(active) ? asMember(active) : members.find(({ handle }) => handle === active)
    )

    setAllAccounts(allAccounts)
    setBalances(balances)
    setMembers(members)
    setActive(active)
  }, [params])

  const getMemberIdByBoundAccountAddress = useCallback(
    (address: string) => members.find((member) => member.boundAccounts.includes(address))?.id,
    [members]
  )

  if (!params) return Story()

  // Set contexts
  const accountContextValue: UseAccounts = {
    allAccounts,
    hasAccounts: true,
    isLoading: false,
  }

  const membershipContextValue: MyMemberships = {
    active,
    setActive,
    members,
    hasMembers: members.length > 0,
    isLoading: false,
    helpers: { getMemberIdByBoundAccountAddress },
  }

  return (
    <AccountsContext.Provider value={accountContextValue}>
      <BalancesContext.Provider value={balances}>
        <MembershipContext.Provider value={membershipContextValue}>
          <Story />
        </MembershipContext.Provider>
      </BalancesContext.Provider>
    </AccountsContext.Provider>
  )
}

const asBalance = (balance: Balance = 0): BN => (balance instanceof BN ? balance : asBN(joy(balance)))
