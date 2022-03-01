import { RawBountyMock, seedBounties } from '@/mocks/data'
import { seedForumCategories, seedForumThreads } from '@/mocks/data/seedForum'

export const seedBountyThread = (server: any) => {
  seedForumCategories(server, [{ moderatorIds: [] }])
  seedForumThreads(server, [{ authorId: '0' }])
}

export const seedSafeBounties = (server: any, overrides: Partial<RawBountyMock>[] = [{}, {}, {}, {}]) => {
  const baseBounty = {
    creatorId: undefined,
    oracleId: undefined,
    entrantWhitelist: undefined,
    discussionThreadId: '0',
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
