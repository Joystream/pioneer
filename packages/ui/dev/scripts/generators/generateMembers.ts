import faker from 'faker'

import { randomFromRange } from './utils'

export const MAX_MEMBERS = 50
export const KNOWN_MEMBERS = [
  {
    handle: 'alice',
    rootAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    isVerified: true,
  },
  {
    handle: 'bob',
    rootAccount: '5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc',
    controllerAccount: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    isVerified: true,
  },
]

export const generateMembers = () => {
  let nextId = 0

  const generateMember = (known = {}) => ({
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
    inviteCount: 5,
    registeredAtBlockId: String(nextId),
    ...known,
  })

  return [...KNOWN_MEMBERS.map(generateMember), ...Array.from({ length: MAX_MEMBERS }, generateMember)]
}
