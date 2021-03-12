import { mirageGraphQLFieldResolver } from '@miragejs/graphql'
import { MockMember } from '../../test/mocks/members'
import { GetMembersQueryResult, GetMembersQueryVariables, SearchMembersQueryResult } from '../api/queries'

type QueryResolver<ArgsType extends Record<string, unknown>, ReturnType = unknown> = (
  obj: unknown,
  args: ArgsType,
  context: { mirageSchema: any },
  info: unknown
) => ReturnType

export const getMemberResolver = (obj: any, args: any, context: any, info: any) => {
  const resolverArgs = {
    id: args.where.id,
  }

  return mirageGraphQLFieldResolver(obj, resolverArgs, context, info)
}

export const getMembersResolver: QueryResolver<{ where: GetMembersQueryVariables }, GetMembersQueryResult[]> = (
  obj,
  args,
  { mirageSchema: schema }
) => {
  const rootAccountIn = args.where.rootAccount_in

  const { models } = rootAccountIn
    ? schema.where('Member', (member: MockMember) => rootAccountIn?.includes(member.rootAccount))
    : schema.all('Member')

  return models
}

export const searchMembersResolver: QueryResolver<{ text: string; limit?: number }, SearchMembersQueryResult[]> = (
  obj,
  args,
  { mirageSchema: schema }
) => {
  const text = args.text

  console.log('search by', text)

  const { models } = schema.where('Member', (member: MockMember) => {
    const match = member.handle?.match(text)
    console.log('match?', member.handle, text, match)
    return match
  })

  return models
}
