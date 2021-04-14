import rawOpenings from './raw/openings.json'

interface RawOpeningMock {
  groupId: number
  type: string // 'leader' | 'regular'
  status: string // 'open' | 'filled' | 'cancelled'
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

const seedOpening = (openingData: RawOpeningMock, server: any) => {
  const metadata = server.schema.create('WorkingGroupOpeningMetadata', openingData.metadata)

  const opening = {
    ...openingData,
    metadata: metadata,
    status: null,
  }

  return server.schema.create('WorkingGroupOpening', opening)
}

export const seedOpenings = (server: any) => openingsData.map((openingData) => seedOpening(openingData, server))
