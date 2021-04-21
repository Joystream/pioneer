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
  const workingGroups = server.schema.all('WorkingGroup')

  const ids = workingGroups.models.map(({ id }: any) => id)

  openingsData.map((openingData) => {
    console.group('seedOpening')
    const questions = openingData.metadata.applicationFormQuestions
    openingData.metadata.applicationFormQuestions = []

    for (const id of ids) {
      const opening = seedOpening({ ...openingData, groupId: id }, server)
      console.log(opening.metadata)

      for (const question of questions) {
        const createdQuestion = server.schema.create('ApplicationFormQuestion', {
          index: questions.indexOf(question),
          ...question,
          openingMetadata: opening.metadata,
        })
        console.log(question, createdQuestion)
      }
    }
    console.groupEnd()
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
