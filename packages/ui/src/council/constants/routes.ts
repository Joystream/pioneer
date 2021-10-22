export const CouncilRoutes = {
  council: '/council',
  pastCouncils: '/council/past-councils',
  currentElection: '/council/election',
  myVotes: '/council/election/my-votes',
  pastElections: '/council/past-elections',
  pastElection: '/council/past-elections/:id',
  pastVotes: '/council/past-votes',
} as const

type CouncilRoutesType = typeof CouncilRoutes

declare module '@/app/constants/routes' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Routes extends CouncilRoutesType {}
}
