import { mirageGraphQLFieldResolver } from '@miragejs/graphql'
import { MockMember } from '../../test/mocks/members'
import { GetMembersQueryResult, GetMembersQueryVariables } from '../api/queries'

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
