import { mirageGraphQLFieldResolver } from '@miragejs/graphql'
import { adaptRecords } from '@miragejs/graphql/dist/orm/records'

import {
  GetMembersQueryResult,
  GetMembersQueryVariables,
  MemberFieldsFragment,
  SearchMembersQueryResult,
} from '../memberships/queries'
import { GetWorkersQueryResult, GetWorkersQueryVariables, GetWorkingGroupsQueryResult } from '../working-groups/queries'

import { MockMember } from './data'
import { MockWorker } from './data/mockWorkingGroups'

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

  return adaptRecords(models)
}

export const getWorkingGroupOpeningsResolver: QueryResolver<any, GetWorkingGroupOpeningsQueryResult[]> = (
  parent,
  args,
  { mirageSchema: schema }
) => {
  const { models } = args.where.group_eq
    ? schema.where('WorkingGroupOpening', { groupId: args.where.group_eq })
    : schema.all('WorkingGroupOpening')

  return adaptRecords(models)
}

export const getWorkersResolver: QueryResolver<{ where: GetWorkersQueryVariables }, GetWorkersQueryResult[]> = (
  obj,
  args,
  { mirageSchema: schema }
) => {
  const groupId = args.where.group_eq

  const { models } = groupId
    ? schema.where('Worker', (worker: MockWorker) => groupId == worker.groupId)
    : schema.all('Worker')

  return models
}
