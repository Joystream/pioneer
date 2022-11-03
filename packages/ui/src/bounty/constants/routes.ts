export const BountyRoutes = {
  // new shortcuts
  show: '/bounties/:id',
  tab: '/bounties/:id/:tab',
  page: '/bounty/:page',

  // legacy
  currentBounties: '/bounty/current',
  pastBounties: '/bounty/past',
  myBounties: '/bounty/my-bounties',
  myContributions: '/bounty/my-contributions',
  myEntries: '/bounty/my-entries',
  bountyTags: '/bounty/tags',
  bountyTab: '/bounty/preview/:id/:tab',
  bounty: '/bounty/preview/:id',
  bounties: '/bounty',
} as const

type BountyRoutesType = typeof BountyRoutes

export interface BountyRouteParams {
  id: string
  tab?: string
}

declare module '@/app/constants/routes' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Routes extends BountyRoutesType {}
}
