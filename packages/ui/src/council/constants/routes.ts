export const CouncilRoutes = {
  council: '/council',
  pastCouncils: '/council/past-councils',
  pastCouncil: '/council/past-councils/:cycleId',
} as const

type CouncilRoutesType = typeof CouncilRoutes

export const ElectionRoutes = {
  currentElection: '/election',
  myVotes: '/election/my-votes',
  pastElections: '/election/past-elections',
  pastElection: '/election/past-elections/:cycleId',
  pastVotes: '/election/past-votes',
} as const

type ElectionRoutesType = typeof ElectionRoutes

declare module '@/app/constants/routes' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Routes extends CouncilRoutesType, ElectionRoutesType {}
}
