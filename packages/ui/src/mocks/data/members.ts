import { MemberWithDetailsFieldsFragment } from '@/memberships/queries'

import rawMembers from './raw/members.json'

export type Membership = Omit<MemberWithDetailsFieldsFragment, '__typename'>
export const member = (handle: string, { roles = [], ...extra }: Partial<Membership> = {}) =>
  ({
    ...rawMembers.find((member) => member.handle === handle),
    invitees: [],
    ...extra,
    roles,
  } as Membership)
