const faker = require('faker')

const { randomUniqueArrayFromRange, randomFromRange, randomMarkdown } = require('./utils')
const { MAX_MEMBERS } = require('./generateMembers')
const { WORKING_GROUPS } = require('./generateWorkingGroups')

const generateOpenings = () => {
  let nextQuestionId = 0
  let nextOpeningId = 0

  const generateOpening = (status, groupId, name) => () => {
    const isLeader = Math.random() > 0.9

    const applicationFormQuestions = [
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

    return {
      id: String(nextOpeningId++),
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
        applicationFormQuestions: applicationFormQuestions,
      },
      unstakingPeriod: 5,
      rewardPerBlock: randomFromRange(1, 5) * 100,
      createdAtBlockId: randomFromRange(20, 100),
      createdAt: '2021-04-09T13:37:42.155Z',
    }
  }

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
      createdAt: '2021-03-09T10:38:04.155Z',
    })

    return applicantsIds.map(generateApplication)
  })
}

const generateOpeningsAndApplications = () => {
  const openings = generateOpenings().flatMap((a) => a)
  const applications = generateApplications(openings).flatMap((a) => a)

  return {
    openings,
    applications,
  }
}

module.exports = { generateOpeningsAndApplications }
