const fs = require('fs')
const path = require('path')
const faker = require('faker')

const randomFromRange = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed()
}

const randomUniqueArrayFromRange = (currentWorkers, min, max) => {
  const set = new Set(Array.from({ length: currentWorkers }, () => randomFromRange(min, max)))
  return [...set.values()]
}

const saveFile = (name, contents) => {
  const pathName = path.join(__dirname, '..', '..', 'src', 'mocks', 'data', 'raw', name + '.json')
  fs.writeFileSync(pathName, JSON.stringify(contents, null, 2))
}

const FIRST_BLOCK = 1000
const MAX_MEMBERS = 100
const KNOWN_MEMBERS = [
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

const generateMembers = () => {
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

  const members = Array.from({ length: MAX_MEMBERS }, generateMember)

  members.push(...KNOWN_MEMBERS.map(generateMember))

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

const WORKING_GROUPS = ['forum', 'storage', 'content', 'membership']

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

  return WORKING_GROUPS.map(generateWorkingGroup)
}

const generateWorkers = () => {
  const generateWorker = (type, groupId) => (memberId) => ({
    membershipId: memberId,
    workingGroupId: groupId,
    status: type,
  })

  const generatePastWorkers = (groupName, id) => {
    const workersIds = randomUniqueArrayFromRange(randomFromRange(2, 10), 0, MAX_MEMBERS)
    const terminatedIds = randomUniqueArrayFromRange(randomFromRange(0, 20), 0, MAX_MEMBERS)
    const leftIds = randomUniqueArrayFromRange(randomFromRange(0, 20), 0, MAX_MEMBERS)

    return [
      ...workersIds.map(generateWorker('active', id)),
      ...terminatedIds.map(generateWorker('terminated', id)),
      ...leftIds.map(generateWorker('left', id)),
    ].sort((a, b) => a.membershipId.localeCompare(b.membershipId))
  }

  return WORKING_GROUPS.map(generatePastWorkers)
}

const main = () => {
  const mocks = {
    members: generateMembers(),
    blocks: generateBlocks(),
    workingGroups: generateWorkingGroups(),
    workers: generateWorkers(),
  }

  Object.entries(mocks).forEach(([fileName, contents]) => saveFile(fileName, contents))
}

main()
