import { RawBountyMock, seedBounties } from '@/mocks/data'

export const seedSafeBounties = (server: any, overrides: Partial<RawBountyMock>[] = [{}, {}, {}, {}]) => {
  const baseBounty = {
    creatorId: undefined,
    oracleId: undefined,
    entrantWhitelist: undefined,
    discussionThreadId: undefined,
    isTerminated: false,
  }
  const safeBounties = [
    { ...baseBounty, creatorId: '0' },
    { ...baseBounty, creatorId: '0', oracleId: '1' },
    { ...baseBounty, oracleId: '1' },
    { ...baseBounty, entrantWhitelist: ['0', '1'] },
  ]

  const bounties = overrides.map((override, index) => {
    const safeBounty = safeBounties[index % safeBounties.length]
    return { ...safeBounty, ...override }
  })

  seedBounties(server, bounties)
}
