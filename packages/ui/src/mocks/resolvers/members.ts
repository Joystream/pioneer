import { MemberFieldsFragment, SearchMembersQueryResult } from '@/memberships/queries'
import { QueryResolver } from '@/mocks/resolvers/types'

const getMatcher = (text: string) => {
  const regExp = new RegExp(text, 'i')
  return (check: string | null | undefined) => regExp.test(check || '')
}

export const searchMembersResolver: QueryResolver<{ text: string; limit?: number }, SearchMembersQueryResult[]> = (
  obj,
  { text, limit },
  { mirageSchema: schema }
) => {
  const isMatch = getMatcher(text)

  const { models } = schema.where('Membership', (member: MemberFieldsFragment) => {
    return isMatch(member.handle) || isMatch(member.metadata.name) || isMatch(member.id)
  })

  return limit ? models.slice(0, limit) : models
}
