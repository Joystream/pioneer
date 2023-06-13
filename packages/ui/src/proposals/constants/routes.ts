export const ProposalsRoutes = {
  current: '/proposals/current',
  past: '/proposals/past',
  myproposals: '/proposals/my-proposals',
  preview: '/proposals/preview/:id',
  home: '/proposals',
} as const

type ProposalsRoutesType = typeof ProposalsRoutes

declare module '@/app/constants/routes' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Routes extends ProposalsRoutesType {}
}
