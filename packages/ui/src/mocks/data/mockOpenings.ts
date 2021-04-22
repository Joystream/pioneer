import rawOpenings from './raw/openings.json'

type OpeningStatusType = 'open' | 'filled' | 'cancelled'

interface QuestionMock {
  type: string
  question: string
}

interface RawOpeningMock {
  groupId: number
  type: string // 'leader' | 'regular'
  status: string // OpeningStatusType
  stakeAmount: number
  metadata: {
    shortDescription: string
    description: string
    hiringLimit: number
    expectedEnding: string
    applicationDetails: string
    applicationFormQuestions?: QuestionMock[]
  }
  unstakingPeriod: number
  rewardPerBlock: number
  createdAtBlock: number
  createdAtTime: string
}

export const openingsData = rawOpenings.map((rawGroup) => ({ ...rawGroup }))

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

const seedOpening = (openingData: RawOpeningMock, server: any) => {
  const metadata = server.schema.create('WorkingGroupOpeningMetadata', openingData.metadata)

  const opening = {
    ...openingData,
    metadata: metadata,
    status: getOpeningStatus(openingData.status as OpeningStatusType, server),
  }

  return server.schema.create('WorkingGroupOpening', opening)
}

export const seedOpenings = (server: any) => {
  openingsData.map((openingData) => {
    const questions = openingData.metadata.applicationFormQuestions
    openingData.metadata.applicationFormQuestions = []

    const opening = seedOpening({ ...openingData }, server)

    for (const question of questions) {
      server.schema.create('ApplicationFormQuestion', {
        index: questions.indexOf(question),
        ...question,
        openingMetadata: opening.metadata,
      })
    }
  })
}

export const seedOpeningStatuses = (server: any) => {
  server.schema.create('OpeningStatusCancelled', {
    openingCancelledEventID: 0,
  })
  server.schema.create('OpeningStatusFilled', {
    openingFilledEventID: 0,
  })
  server.schema.create('OpeningStatusOpen', {
    _phantom: 0,
  })
}
