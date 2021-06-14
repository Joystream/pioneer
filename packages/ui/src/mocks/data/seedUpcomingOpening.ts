import { Network } from '@/common/api/queries'
import { seedRandomBlockFields } from '@/mocks/data/seedRandomBlockFields'
import { asUpcomingWorkingGroupOpening } from '@/working-groups/types'

import rawOpenings from './raw/upcomingOpenings.json'
import { RawOpeningMetadata, seedOpeningQuestions } from './seedOpenings'

export interface RawUpcomingOpeningMock {
  id: string
  runtimeId: number
  groupId: string
  stakeAmount: number
  metadata: RawOpeningMetadata
  expectedStart: string
  rewardPerBlock: number
}

export const getMockAsUpcomingOpening = (index = 0) => {
  return asUpcomingWorkingGroupOpening({
    __typename: 'UpcomingWorkingGroupOpening',
    createdAtBlock: {
      __typename: 'Block',
      id: '1',
      number: 1234,
      timestamp: '',
      network: 'OLYMPIA' as unknown as Network,
    },
    ...rawOpenings[index],
    group: {
      __typename: 'WorkingGroup',
      name: 'Forum',
      budget: 1000,
    },
  } as any)
}

export const upcomingOpeningsData = rawOpenings.map((rawOpening) => ({ ...rawOpening }))

export function seedUpcomingOpening(openingData: RawUpcomingOpeningMock, server: any) {
  const rawMetadata = { ...openingData.metadata }
  const questions = rawMetadata.applicationFormQuestions
  rawMetadata.applicationFormQuestions = []

  const metadata = server.schema.create('WorkingGroupOpeningMetadata', rawMetadata)

  const opening = server.schema.create('UpcomingWorkingGroupOpening', {
    ...openingData,
    metadata: metadata,
    createdInEvent: server.schema.create('StatusTextChangedEvent', {
      groupId: openingData.groupId,
      ...seedRandomBlockFields(),
    }),
  })

  seedOpeningQuestions(questions, opening.metadata, server)
}

export const seedUpcomingOpenings = (server: any) => {
  upcomingOpeningsData.map((openingData) => seedUpcomingOpening(openingData, server))
}
