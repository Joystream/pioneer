export const ValidatorsRoutes = {
  list: '/validators',
  bonds: '/validators/bonds',
} as const

type ValidatorsRoutesType = typeof ValidatorsRoutes

declare module '@/app/constants/routes' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Routes extends ValidatorsRoutesType {}
}
