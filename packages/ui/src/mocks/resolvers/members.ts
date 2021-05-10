import { mirageGraphQLFieldResolver } from '@miragejs/graphql'

import { MemberFieldsFragment, SearchMembersQueryResult } from '@/memberships/queries'
import { getConnectionResolver, getWhereResolver } from '@/mocks/baseResolvers'
import { QueryResolver } from '@/mocks/types'

export const getMemberResolver = (obj: any, args: any, context: any, info: any) => {
  const resolverArgs = {
    id: args.where.id,
  }

  return mirageGraphQLFieldResolver(obj, resolverArgs, context, info)
}

export const getMembersResolver = getWhereResolver('Membership', () => () => true)

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

export const membershipsConnectionResolver = getConnectionResolver('MembershipConnection')
