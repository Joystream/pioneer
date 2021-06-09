import faker from 'faker'

import { WorkingGroupOpeningType } from '@/common/api/queries'
import { asWorkingGroupOpening } from '@/working-groups/types'

import rawOpenings from './raw/openings.json'

type OpeningStatusType = 'open' | 'filled' | 'cancelled'

interface QuestionMock {
  type: string
  question: string
}

export interface RawOpeningMock {
  groupId: string
  type: string // 'leader' | 'regular'
  status: string // OpeningStatusType
  stakeAmount: number
  metadata: {
    shortDescription: string
    description: string
    hiringLimit: number
    expectedEnding: string
    applicationDetails: string
    applicationFormQuestions: QuestionMock[]
  }
  unstakingPeriod: number
  rewardPerBlock: number
}

export const getMockAsOpening = (index = 0) => {
  return asWorkingGroupOpening({
    ...rawOpenings[index],
    metadata: {
      __typename: 'WorkingGroupOpeningMetadata',
      ...rawOpenings[index].metadata,
      expectedEnding: faker.date.soon(5).toJSON(),
    },
    status: {
      __typename: 'OpeningStatusOpen',
    },
    type: WorkingGroupOpeningType.Regular,
    __typename: 'WorkingGroupOpening',
    applications: [],
    group: {
      leaderId: null,
      __typename: 'WorkingGroup',
      budget: 10_000,
      name: 'Storage',
    },
    unstakingPeriod: 14400,
  })
}

export const openingsData = rawOpenings.map((rawOpening) => ({ ...rawOpening }))

const getOpeningStatus = (status: OpeningStatusType, server: any) => {
  let model = 'OpeningStatusFilled'

  if (status === 'open') {
    model = 'OpeningStatusOpen'
  }

  if (status === 'cancelled') {
    model = 'OpeningStatusCancelled'
  }

  return server.schema.find(model, 1)
}

export function seedOpening(openingData: RawOpeningMock, server: any) {
  const rawMetadata = { ...openingData.metadata }
  const questions = rawMetadata.applicationFormQuestions
  rawMetadata.applicationFormQuestions = []

  const metadata = server.schema.create('WorkingGroupOpeningMetadata', rawMetadata)
  const openingStatus = getOpeningStatus(openingData.status as OpeningStatusType, server)

  const opening = server.schema.create('WorkingGroupOpening', {
    ...openingData,
    metadata: metadata,
    status: openingStatus,
  })

  for (const question of questions) {
    server.schema.create('ApplicationFormQuestion', {
      index: questions.indexOf(question),
      ...question,
      openingMetadata: opening.metadata,
    })
  }
}

export const seedOpenings = (server: any) => {
  openingsData.map((openingData) => seedOpening(openingData, server))
}

export const seedOpeningStatuses = (server: any) => {
  server.schema.create('OpeningStatusCancelled', {
    openingCancelledEventID: 0,
  })
  server.schema.create('OpeningStatusFilled', {
    openingFilledEventID: 0,
  })
  server.schema.create('OpeningStatusOpen', {
    phantom: 0,
  })
}
