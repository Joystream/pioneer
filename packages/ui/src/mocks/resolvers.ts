import { mirageGraphQLFieldResolver } from '@miragejs/graphql'
import { adaptRecords } from '@miragejs/graphql/dist/orm/records'

import {
  GetMembersQueryResult,
  GetMembersQueryVariables,
  MemberFieldsFragment,
  SearchMembersQueryResult,
} from '../memberships/queries'
import { GetWorkersQueryResult, GetWorkingGroupsQueryResult } from '../working-groups/queries'

import { MockMember } from './data'

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
  const controllerAccountIn = args.where.controllerAccount_in

  const { models } = rootAccountIn
    ? schema.where(
        'Membership',
        (member: MockMember) =>
          rootAccountIn?.includes(member.rootAccount) || controllerAccountIn?.includes(member.controllerAccount)
      )
    : schema.all('Membership')

  return models
}

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
    return isMatch(member.handle) || isMatch(member.name) || isMatch(member.id)
  })

  return limit ? models.slice(0, limit) : models
}

export const getWorkingGroupsResolver: QueryResolver<any, GetWorkingGroupsQueryResult[]> = (
  obj,
  args,
  { mirageSchema: schema }
) => {
  const { models } = schema.all('WorkingGroup')

  const records = adaptRecords(models)

  console.warn('records', records, 'models', models)

  return records
}

export const getWorkerResolver: QueryResolver<any, any> = (parent, args, context, info) => {
  console.error("WORKER'", parent, args, context, info)
  return mirageGraphQLFieldResolver(parent, {}, context, info)
}
