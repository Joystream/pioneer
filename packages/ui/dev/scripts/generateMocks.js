const faker = require('faker')

const randomFromRange = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed()
}

const FIRST_BLOCK = 1000

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
    registeredAtBlockId: nextId + FIRST_BLOCK,
    registeredAtTime: new Date().toJSON(),
    ...known,
  })

  const members = Array.from({ length: 100 }, generateMember)

  members.push(...known.map(generateMember))

  return members
}

const generateBlocks = () => {
  let nextNumber = FIRST_BLOCK

  const generateBlock = () => ({
    network: nextNumber < 1100 ? 'Babylon' : 'Olympia',
    number: nextNumber++,
    timestamp: new Date().toJSON(),
  })

  return Array.from({ length: 1000 }, generateBlock)
}

const generateWorkingGroups = () => {
  const generateWorkingGroup = (groupName, id) => ({
    id,
    name: groupName,
    workers: [],
    leaderId: null,
    budget: randomFromRange(1000, 5000),
    metadata: {
      name: faker.lorem.words(2),
      message: faker.lorem.words(randomFromRange(2, 5)),
      about: faker.lorem.words(randomFromRange(30, 50)),
      description: [
        `# ${faker.lorem.words(randomFromRange(2, 6))}`,
        faker.lorem.paragraph(),
        `## ${faker.lorem.words(randomFromRange(2, 5))}`,
        faker.lorem.paragraphs(randomFromRange(1, 3)),
      ].join('\n\n'),
      setAtBlockId: randomFromRange(FIRST_BLOCK, FIRST_BLOCK + 50),
      setAtTime: '2021-03-09T10:28:04.155Z',
    },
  })

  return ['forum', 'storage', 'content', 'membership'].map(generateWorkingGroup)
}

const main = () => {
  const members = generateMembers()
  const blocks = generateBlocks()
  const workingGroups = generateWorkingGroups()
}

main()
