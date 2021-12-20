export interface RawBountyMock {
  id: string
  title: string
  description: string
  cherry: string
  entrantStake: string
  creatorId?: string
  oracleId?: string
  fundingType:
    | { type: string; target: string }
    | { type: string; minFundingAmount: string; maxFundingAmount: string; fundingPeriod: number }
  contractType: { type: string; whitelistIds?: string[] }
  workPeriod: number
  judgingPeriod: number
  stage: string
  totalFunding: string
}

export interface RawBountyContributionMock {
  id: string
  bountyId: string
  amount: string
}

export interface RawBountyEntryMock {
  id: string
  bountyId: string
  workerId: string
  stake: string
  stakingAccount: string
  workSubmitted: boolean
  works: string[]
  status: { type: string; reward?: string }
}
