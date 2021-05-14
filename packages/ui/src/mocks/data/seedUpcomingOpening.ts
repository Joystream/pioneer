import { asUpcomingWorkingGroupOpening } from '@/working-groups/types'

import rawOpenings from './raw/upcomingOpenings.json'

interface QuestionMock {
  type: string
  question: string
}

interface RawUpcomingOpeningMock {
  groupId: string
  stakeAmount: number
  metadata: {
    shortDescription: string
    description: string
    hiringLimit: number
    expectedEnding: string
    applicationDetails: string
    applicationFormQuestions: QuestionMock[]
  }
  expectedStart: string
  rewardPerBlock: number
  createdAtBlockId: string
}

export const getMockAsOpening = (index = 0) => {
  return asUpcomingWorkingGroupOpening(rawOpenings[index] as any)
}

export const openingsData = rawOpenings.map((rawOpening) => ({ ...rawOpening }))

export function seedUpcomingOpening(openingData: RawUpcomingOpeningMock, server: any) {
  const rawMetadata = { ...openingData.metadata }
  const questions = rawMetadata.applicationFormQuestions
  rawMetadata.applicationFormQuestions = []

  const metadata = server.schema.create('WorkingGroupOpeningMetadata', rawMetadata)

  const opening = server.schema.create('UpcomingWorkingGroupOpening', {
    ...openingData,
    metadata: metadata,
  })

  for (const question of questions) {
    server.schema.create('ApplicationFormQuestion', {
      index: questions.indexOf(question),
      ...question,
      openingMetadata: opening.metadata,
    })
  }
}

export const seedUpcomingOpenings = (server: any) => {
  openingsData.map((openingData) => seedUpcomingOpening(openingData, server))
}
