export const ProfileRoutes = {
  profile: '/profile',
  memberships: '/profile/memberships',
} as const

export const MembersRoutes = {
  members: '/members/:id?',
} as const

export const TermsRoutes = {
  termsOfService: '/tos',
  privacyPolicy: '/privacy',
} as const

type ProfileRoutesType = typeof ProfileRoutes
type MembersRoutesType = typeof MembersRoutes

export interface Routes extends ProfileRoutesType, MembersRoutesType {}

export type RouteName = Routes[keyof Routes]
