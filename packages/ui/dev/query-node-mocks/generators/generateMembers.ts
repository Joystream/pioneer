import faker from 'faker'

import { accountsMap } from '../../node-mocks/data/addresses'

import { randomBlock, randomFromRange } from './utils'

const MAX_MEMBERS = 42

interface KnownMember {
  isVerified: boolean
  handle: string
  rootAccount: string
  controllerAccount: string
  isCouncilMember: boolean
  boundAccounts?: string[]
}

export const KNOWN_MEMBERS: KnownMember[] = [
  {
    handle: 'alice',
    rootAccount: accountsMap.alice_stash,
    controllerAccount: accountsMap.alice,
    isVerified: true,
    isCouncilMember: false,
    boundAccounts: [accountsMap.alice, accountsMap.alice_stash],
  },
  {
    handle: 'bob',
    rootAccount: accountsMap.bob_stash,
    controllerAccount: accountsMap.bob,
    boundAccounts: [accountsMap.bob],
    isVerified: true,
    isCouncilMember: true,
  },
  {
    handle: 'charlie',
    rootAccount: accountsMap.charlie,
    controllerAccount: accountsMap.charlie,
    isVerified: true,
    isCouncilMember: false,
  },
  {
    handle: 'dave',
    rootAccount: accountsMap.dave,
    controllerAccount: accountsMap.dave,
    isVerified: true,
    isCouncilMember: false,
  },
  {
    handle: 'eve',
    rootAccount: accountsMap.eve,
    controllerAccount: accountsMap.eve,
    isVerified: true,
    isCouncilMember: false,
  },
  {
    handle: 'ferdie',
    rootAccount: accountsMap.ferdie,
    controllerAccount: accountsMap.ferdie,
    isVerified: true,
    isCouncilMember: false,
  },
]

let nextId = 0

const generateBaseMember = () => ({
  id: String(nextId++),
  rootAccount: '5ChwAW7ASAaewhQPNK334vSHNUrPFYg2WriY2vDBfEQwkipU',
  controllerAccount: '5ChwAW7ASAaewhQPNK334vSHNUrPFYg2WriY2vDBfEQwkipU',
  boundAccounts: [],
  boundAccountsEvents: [],
  handle: `${faker.lorem.word()}_${faker.lorem.word()}_${nextId}`,
  metadata: {
    name: faker.lorem.words(2),
    about: faker.lorem.paragraphs(randomFromRange(1, 4)),
  },
  isVerified: Math.random() > 0.5,
  isFoundingMember: nextId < 9,
  isCouncilMember: Math.random() > 0.9,
  inviteCount: 5,
})

const generateMember = (override?: KnownMember) => ({
  ...generateBaseMember(),
  ...override,
  entry: {
    __typename: 'MembershipEntryPaid',
    membershipBoughtEvent: randomBlock(),
  },
})

const inviteMember = (invitedById: string) => ({
  ...generateBaseMember(),
  invitedById,
  entry: {
    __typename: 'MembershipEntryInvited',
    memberInvitedEvent: randomBlock(),
  },
})

export type MemberMock = ReturnType<typeof generateMember> | ReturnType<typeof inviteMember>

export const generateMembers = () => {
  const membersBought = [...KNOWN_MEMBERS.map(generateMember), ...Array.from({ length: MAX_MEMBERS }, generateMember)]
  const membersInvited = [inviteMember('0'), inviteMember('0'), inviteMember('1'), inviteMember('0')]

  return [...membersBought, ...membersInvited]
}
