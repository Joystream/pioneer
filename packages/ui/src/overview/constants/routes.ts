export const OverviewRoutes = {
  overview: '/overview',
}

type OverviewRoutesType = typeof OverviewRoutes

declare module '@/app/constants/routes' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Routes extends OverviewRoutesType {}
}
