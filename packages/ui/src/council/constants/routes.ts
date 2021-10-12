export const CouncilRoutes = {
  council: '/council',
  pastCouncils: '/council/past-councils',
  currentElection: '/council/election',
  pastElections: '/council/past-elections',
  pastVotes: '/council/past-votes',
} as const

type CouncilRoutesType = typeof CouncilRoutes

declare module '@/app/constants/routes' {
  // eslint-disable-next-line
  interface Routes extends CouncilRoutesType {}
}
