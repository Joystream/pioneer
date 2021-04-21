import rawOpenings from './raw/openings.json'

type OpeningStatusType = 'open' | 'filled' | 'cancelled'

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
    applicationFormQuestions?: string[]
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
    seedOpening({ ...openingData }, server)
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
