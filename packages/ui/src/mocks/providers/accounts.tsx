import { createType } from '@joystream/types'
import BN from 'bn.js'
import { PolkadotLogo, Wallet } from 'injectweb3-connect'
import { isObject, isString, mapValues } from 'lodash'
import React, { FC, useCallback, useEffect, useState } from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { Account, AddressToBalanceMap, LockType } from '@/accounts/types'
import { whenDefined } from '@/common/utils'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { Member, asMember } from '@/memberships/types'

import { Membership } from '../data/members'
import { joy } from '../helpers'

export type Balance = number | string | BN

type BalanceLock = LockType | { amount: Balance; type: LockType }
type DeriveBalancesVesting = {
  startingBlock: Balance
  endBlock: Balance
  perBlock: Balance
  locked: Balance
  vested: Balance
}
type Balances =
  | Balance
  | {
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
  account?: { name: string; address: string }
  member?: Membership
}

type Active = AccountMock | Membership['handle']

type MockAccounts = { active?: Active; list?: AccountMock[]; hasWallet?: boolean } | undefined

export type MockAccountsProps = { accounts?: MockAccounts }

export const MockAccountsProvider: FC<MockAccountsProps> = ({ children, accounts }) => {
  const [allAccounts, setAllAccounts] = useState<Account[]>([])
  const [balances, setBalances] = useState<AddressToBalanceMap>({})
  const [members, setMembers] = useState<MyMemberships['members']>([])
  const [active, setActive] = useState<Member | undefined>()

  useEffect(() => {
    const list = accounts?.list ?? (accounts && isObject(accounts.active) ? [accounts.active] : undefined)
    if (!list) return

    const accountData = list.flatMap(
      ({ balances, member, account: { name = member?.handle, address = member?.controllerAccount } = {} }) =>
        whenDefined(address, (address) => ({ name, address, balances, member })) ?? []
    )

    const allAccounts: Account[] = accountData.map(({ name, address }) => ({ name, address }))

    const balances: AddressToBalanceMap = Object.fromEntries(
      accountData.map(({ address, balances = 100 }) => {
        const _balances = isObject(balances) && !(balances instanceof BN) ? balances : { total: balances }
        const locks =
          _balances?.locks?.map((lock) =>
            isString(lock) ? { amount: asBalance(1), type: lock } : { amount: asBalance(lock.amount), type: lock.type }
          ) ?? []

        const vesting = _balances?.vesting?.map((schedule) => mapValues(schedule, asBalance)) ?? []

        return [
          address,
          {
            total: asBalance(_balances.total ?? _balances.transferable),
            locked: asBalance(_balances.locked),
            recoverable: asBalance(_balances.recoverable),
            transferable: asBalance(_balances.transferable ?? _balances.total),
            locks,
            vesting,
            vestingTotal: asBalance(_balances.vestingTotal),
            vestedClaimable: asBalance(_balances.vestedClaimable),
            vestedBalance: asBalance(_balances.vestedBalance),
            vestingLocked: asBalance(_balances.vestingLocked),
          },
        ]
      })
    )

    const members = accountData.flatMap(({ member }) => whenDefined(member, asMember) ?? [])

    const active = whenDefined(accounts?.active, (active) =>
      isString(active) ? members.find(({ handle }) => handle === active) : active.member && asMember(active.member)
    )

    setAllAccounts(allAccounts)
    setBalances(balances)
    setMembers(members)
    setActive(active)
  }, [accounts])

  const getMemberIdByBoundAccountAddress = useCallback(
    (address: string) => members.find((member) => member.boundAccounts.includes(address))?.id,
    [members]
  )

  if (!accounts) return <>{children}</>

  // Set contexts
  const accountContextValue: UseAccounts = {
    allAccounts,
    hasAccounts: true,
    isLoading: false,
    wallet: accounts.hasWallet === false ? undefined : WALLET,
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
        <MembershipContext.Provider value={membershipContextValue}>{children}</MembershipContext.Provider>
      </BalancesContext.Provider>
    </AccountsContext.Provider>
  )
}

const asBalance = (balance: Balance = 0): BN =>
  (balance instanceof BN ? balance : createType('BalanceOf', joy(balance))) as BN

const WALLET: Wallet = {
  installed: true,
  enable: () => undefined,
  extensionName: 'foo',
  title: 'bar',
  installUrl: 'http://example.com',
  logo: { src: PolkadotLogo, alt: 'Wallet logo' },
  signer: {},
  extension: {},
  getAccounts: async () => [],
  subscribeAccounts: () => undefined,
  updateMetadata: async () => false,
  walletAccountToInjectedAccountWithMeta: () => ({ address: '0x123', meta: { source: '' } }),
  transformError: () => Error(),
}
