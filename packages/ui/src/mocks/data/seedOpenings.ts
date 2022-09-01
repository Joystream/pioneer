import faker from 'faker'

import { Network, WorkingGroupOpeningType } from '@/common/api/queries'
import { seedRandomBlockFields } from '@/mocks/data/seedRandomBlockFields'
import { asWorkingGroupOpening } from '@/working-groups/types'

import rawOpenings from './raw/openings.json'

type OpeningStatusType = 'open' | 'filled' | 'cancelled'

interface QuestionMock {
  type: string
  question: string
}

export interface RawOpeningMetadata {
  title: string
  shortDescription: string
  description: string
  hiringLimit: number
  expectedEnding: string
  applicationDetails: string
  applicationFormQuestions: QuestionMock[]
}

export interface RawOpeningMock {
  id: string
  runtimeId: number
  groupId: string
  type: string // 'leader' | 'regular'
  status: string // OpeningStatusType
  stakeAmount: number
  metadata: RawOpeningMetadata
  unstakingPeriod: number
  rewardPerBlock: number
}

export const getMockAsOpening = (index = 0) => {
  return asWorkingGroupOpening({
    ...rawOpenings[index],
    stakeAmount: '5000',
    rewardPerBlock: '200',
    metadata: {
      __typename: 'WorkingGroupOpeningMetadata',
      ...rawOpenings[index].metadata,
      expectedEnding: faker.date.soon(5).toJSON(),
    },
    status: {
      __typename: 'OpeningStatusOpen',
    },
    createdInEvent: {
      __typename: 'OpeningAddedEvent',
      createdAt: faker.date.recent(30).toJSON(),
      inBlock: faker.datatype.number(10_000),
      network: Network.Olympia,
    },
    type: WorkingGroupOpeningType.Regular,
    __typename: 'WorkingGroupOpening',
    applications: [],
    group: {
      leaderId: null,
      __typename: 'WorkingGroup',
      budget: '10_000',
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
    createdInEvent: server.schema.create('OpeningAddedEvent', {
      groupId: openingData.groupId,
      ...seedRandomBlockFields(),
    }),
  })

  seedOpeningQuestions(questions, opening.metadata, server)
}

export const seedOpeningQuestions = (questions: QuestionMock[], openingMetadata: any, server: any) =>
  questions.map((question, index) =>
    server.schema.create('ApplicationFormQuestion', {
      index,
      ...question,
      openingMetadata,
    })
  )

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
