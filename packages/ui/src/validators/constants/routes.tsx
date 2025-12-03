export const ValidatorsRoutes = {
  list: '/validators',
  stakes: '/validators/stakes',
  validatordashboard: '/validators/stakes', // Keep for backwards compatibility
  nominator: '/validators/nominator',
  bags: '/validators/bags',
} as const

type ValidatorsRoutesType = typeof ValidatorsRoutes

declare module '@/app/constants/routes' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Routes extends ValidatorsRoutesType {}
}
