const faker = require('faker')

const randomFromRange = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed()
}

const generateMembers = () => {
  const known = [
    {
      handle: 'alice',
      rootAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
      controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      isVerified: true,
    },
    {
      handle: 'bob',
      rootAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
      controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      isVerified: true,
    },
  ]

  let nextId = 0

  const generateMember = (known = {}) => ({
    id: nextId++,
    rootAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    handle: `${faker.lorem.word()}_${faker.lorem.word()}`,
    metadata: {
      name: faker.lorem.words(2),
      about: faker.lorem.paragraphs(randomFromRange(1, 4)),
    },
    isVerified: Math.random() > 0.5,
    isFoundingMember: nextId < 9,
    inviteCount: 5,
    registeredAtBlockId: 3,
    registeredAtTime: '2021-03-29 18:21:06.000000',
    ...known,
  })

  const members = Array.from({ length: 100 }, generateMember)

  members.push(...known.map(generateMember))

  return members
}

const main = () => {
  console.log(generateMembers().pop())
}

main()
