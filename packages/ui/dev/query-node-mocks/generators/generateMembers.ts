import faker from 'faker'

import { randomBlock, randomFromRange } from './utils'

const MAX_MEMBERS = 45

interface KnownMember {
  isVerified: boolean
  handle: string
  rootAccount: string
  controllerAccount: string
  isCouncilMember: boolean
}

export const KNOWN_MEMBERS: KnownMember[] = [
  {
    handle: 'alice',
    rootAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    isVerified: true,
    isCouncilMember: false,
  },
  {
    handle: 'bob',
    rootAccount: '5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc',
    controllerAccount: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    isVerified: true,
    isCouncilMember: true,
  },
]

let nextId = 0

const generateBaseMember = () => ({
  id: String(nextId++),
  rootAccount: '5ChwAW7ASAaewhQPNK334vSHNUrPFYg2WriY2vDBfEQwkipU',
  controllerAccount: '5ChwAW7ASAaewhQPNK334vSHNUrPFYg2WriY2vDBfEQwkipU',
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
