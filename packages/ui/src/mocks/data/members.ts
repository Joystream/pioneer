import { MemberFieldsFragment } from '@/memberships/queries'

import rawMembers from './raw/members.json'

export type Membership = Omit<MemberFieldsFragment, '__typename'>
export const member = (handle: string, { roles = [], ...extra }: Partial<Membership> = {}) =>
  ({
    ...rawMembers.find((member) => member.handle === handle),
    ...extra,
    roles,
  } as Membership)
