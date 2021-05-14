const faker = require('faker')

const { randomUniqueArrayFromRange, randomFromRange, randomMarkdown } = require('./utils')
const { MAX_MEMBERS } = require('./generateMembers')
const { WORKING_GROUPS } = require('./generateWorkingGroups')

let nextQuestionId = 0
let nextOpeningId = 0

const getApplicationFormQuestions = () => [
  {
    id: String(nextQuestionId++),
    type: 'TEXT',
    question: faker.lorem.words(randomFromRange(3, 8)) + '?',
  },
  {
    id: String(nextQuestionId++),
    type: 'TEXTAREA',
    question: faker.lorem.words(randomFromRange(4, 6)) + '?',
  },
]

function generateMetadata(name, isLeader) {
  return {
    shortDescription: `${name} ${isLeader ? 'leader' : 'worker'}`,
    description: randomMarkdown(),
    hiringLimit: 1,
    expectedEnding: '2022-03-09T10:18:04.155Z',
    applicationDetails: randomMarkdown(),
    applicationFormQuestions: getApplicationFormQuestions(),
  }
}

const generateBaseOpening = (groupId) => {
  return {
    id: String(nextOpeningId++),
    groupId: String(groupId),
    stakeAmount: randomFromRange(2, 8) * 1000,
    rewardPerBlock: randomFromRange(1, 5) * 100,
    createdAtBlockId: randomFromRange(20, 100),
    version: 1,
  }
}

const generateOpening = (status, groupId, name) => () => {
  const isLeader = Math.random() > 0.9
  return {
    ...generateBaseOpening(groupId, name, isLeader),
    type: isLeader ? 'LEADER' : 'REGULAR',
    status,
    unstakingPeriod: randomFromRange(5, 10),
    metadata: generateMetadata(name, isLeader),
  }
}

const generateUpcomingOpening = (groupId, name) => () => {
  return {
    ...generateBaseOpening(groupId, name, false),
    metadata: {
      ...generateMetadata(name, false),
      description: 'Upcoming worker opening',
      expectedEnding: faker.date.soon(randomFromRange(40, 50)).toJSON(),
    },
    expectedStart: faker.date.soon(randomFromRange(10, 30)).toJSON(),
  }
}

const generateOpenings = () => {
  const generateOpeningsForGroup = (groupName, id) => {
    return [
      ...Array.from({ length: randomFromRange(1, 3) }, generateOpening('open', id, groupName)),
      ...Array.from({ length: randomFromRange(4, 8) }, generateOpening('filled', id, groupName)),
      ...Array.from({ length: randomFromRange(1, 2) }, generateOpening('cancelled', id, groupName)),
    ]
  }

  return WORKING_GROUPS.map(generateOpeningsForGroup).flatMap((a) => a)
}

const generateApplications = (openings) => {
  return openings.map((opening) => {
    const applicantsIds = randomUniqueArrayFromRange(8, 0, MAX_MEMBERS)
    const questions = opening.metadata.applicationFormQuestions

    const generateApplication = (id) => ({
      openingId: opening.id,
      applicantId: String(id),
      answers: questions.map((question) => ({
        questionId: question.id,
        answer: faker.lorem.words(randomFromRange(5, 10)),
      })),
      status: 'pending',
      createdAtBlockId: 1,
    })

    return applicantsIds.map(generateApplication)
  })
}

const generateUpcomingOpenings = () => {
  const generateUpcomingOpeningsForGroup = (groupName, id) => {
    return [...Array.from({ length: randomFromRange(1, 3) }, generateUpcomingOpening(id, groupName))]
  }

  return WORKING_GROUPS.map(generateUpcomingOpeningsForGroup).flatMap((a) => a)
}

const generateOpeningsAndApplications = () => {
  const openings = generateOpenings().flatMap((a) => a)
  const applications = generateApplications(openings).flatMap((a) => a)
  nextOpeningId = 0
  const upcomingOpenings = generateUpcomingOpenings().flatMap((a) => a)

  return {
    openings,
    applications,
    upcomingOpenings,
  }
}

module.exports = { generateOpeningsAndApplications }
