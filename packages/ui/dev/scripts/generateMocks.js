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

const FIRST_BLOCK_NUMBER = 1000
const WORKING_GROUPS = ['forum', 'storage', 'content', 'membership']
const MAX_MEMBERS = 200
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
    id: String(nextId++),
    rootAccount: '5ChwAW7ASAaewhQPNK334vSHNUrPFYg2WriY2vDBfEQwkipU',
    controllerAccount: '5ChwAW7ASAaewhQPNK334vSHNUrPFYg2WriY2vDBfEQwkipU',
    handle: `${faker.lorem.word()}_${faker.lorem.word()}`,
    metadata: {
      name: faker.lorem.words(2),
      about: faker.lorem.paragraphs(randomFromRange(1, 4)),
    },
    isVerified: Math.random() > 0.5,
    isFoundingMember: nextId < 9,
    inviteCount: 5,
    registeredAtBlockId: String(nextId),
    registeredAtTime: new Date().toJSON(),
    ...known,
  })

  const members = Array.from({ length: MAX_MEMBERS }, generateMember)

  members.push(...KNOWN_MEMBERS.map(generateMember))

  return members
}

const generateBlocks = () => {
  let nextNumber = FIRST_BLOCK_NUMBER

  const generateBlock = () => ({
    network: nextNumber < 1050 ? 'Babylon' : 'Olympia',
    number: nextNumber++,
    timestamp: new Date().toJSON(),
  })

  return Array.from({ length: 1000 }, generateBlock)
}

function randomMarkdown() {
  return [
    `# ${faker.lorem.words(randomFromRange(2, 6))}`,
    faker.lorem.paragraph(),
    `## ${faker.lorem.words(randomFromRange(2, 5))}`,
    faker.lorem.paragraphs(randomFromRange(1, 3)),
  ].join('\n\n')
}

const generateWorkingGroups = () => {
  const generateWorkingGroup = (groupName, id) => ({
    id: String(id),
    name: groupName,
    workers: [],
    leaderId: null,
    budget: randomFromRange(1000, 5000),
    metadata: {
      name: faker.lorem.words(2),
      message: faker.lorem.words(randomFromRange(2, 5)),
      about: faker.lorem.words(randomFromRange(30, 50)),
      description: randomMarkdown(),
      setAtBlockId: randomFromRange(1, 50),
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

  const generateAllWorkers = (groupName, id) => {
    const workersIds = randomUniqueArrayFromRange(randomFromRange(2, 10), 0, MAX_MEMBERS)
    const terminatedIds = randomUniqueArrayFromRange(randomFromRange(0, 20), 0, MAX_MEMBERS)
    const leftIds = randomUniqueArrayFromRange(randomFromRange(0, 20), 0, MAX_MEMBERS)

    return [
      ...workersIds.map(generateWorker('active', id)),
      ...terminatedIds.map(generateWorker('terminated', id)),
      ...leftIds.map(generateWorker('left', id)),
    ].sort((a, b) => a.membershipId.localeCompare(b.membershipId))
  }

  return WORKING_GROUPS.map(generateAllWorkers).flatMap((a) => a)
}

const generateOpenings = () => {
  const generateOpening = (status, groupId, name) => () => {
    const isLeader = Math.random() > 0.9

    return {
      groupId: String(groupId),
      type: isLeader ? 'LEADER' : 'REGULAR',
      status: status,
      stakeAmount: randomFromRange(2, 8) * 1000,
      metadata: {
        shortDescription: `${name} ${isLeader ? 'leader' : 'worker'}`,
        description: randomMarkdown(),
        hiringLimit: 1,
        expectedEnding: '2022-03-09T10:18:04.155Z',
        applicationDetails: randomMarkdown(),
        applicationFormQuestions: [
          {
            type: 'TEXT',
            question: 'How old are you?',
          },
          {
            type: 'TEXTAREA',
            question: 'Why we should choose you?',
          },
        ],
      },
      unstakingPeriod: 5,
      rewardPerBlock: randomFromRange(1, 5) * 100,
      createdAtBlockId: randomFromRange(20, 100),
      createdAt: '2021-04-09T13:37:42.155Z',
    }
  }

  const generateOpeningsForGroup = (groupName, id) => {
    return [
      ...Array.from({ length: randomFromRange(2, 8) }, generateOpening('open', id, groupName)),
      ...Array.from({ length: randomFromRange(2, 8) }, generateOpening('filled', id, groupName)),
      ...Array.from({ length: randomFromRange(2, 8) }, generateOpening('cancelled', id, groupName)),
    ]
  }

  return WORKING_GROUPS.map(generateOpeningsForGroup).flatMap((a) => a)
}

const main = () => {
  const mocks = {
    // members: generateMembers(),
    // blocks: generateBlocks(),
    // workingGroups: generateWorkingGroups(),
    // workers: generateWorkers(),
    openings: generateOpenings(),
  }

  Object.entries(mocks).forEach(([fileName, contents]) => saveFile(fileName, contents))
}

main()
