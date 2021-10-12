export const ProposalsRoutes = {
  current: '/proposals/current',
  past: '/proposals/past',
  myproposals: '/proposals/my-proposals',
  preview: '/proposals/preview',
  home: '/proposals',
} as const

type ProposalsRoutesType = typeof ProposalsRoutes

declare module '@/app/constants/routes' {
  // eslint-disable-next-line
  interface Routes extends ProposalsRoutesType {}
}
