import { mirageGraphQLFieldResolver } from '@miragejs/graphql'
import { adaptRecords } from '@miragejs/graphql/dist/orm/records'

import { Maybe, MembershipOrderByInput, MembershipWhereInput } from '../common/api/queries'
import { MemberFieldsFragment, SearchMembersQueryResult } from '../memberships/queries'
import {
  GetApplicationFormQuestionAnswerQueryResult,
  GetApplicationFormQuestionAnswerQueryVariables,
  GetWorkersQueryResult,
  GetWorkersQueryVariables,
  GetWorkingGroupApplicationsQueryResult,
  GetWorkingGroupApplicationsQueryVariables,
  GetWorkingGroupOpeningsQueryResult,
  GetWorkingGroupsQueryResult,
} from '../working-groups/queries'

import { MockMember } from './data'
import { MockApplication } from './data/mockApplications'
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

interface SortableQueryResult {
  id: string
  handle: string
}
const sort = <T extends SortableQueryResult>(members: T[], orderBy?: Maybe<MembershipOrderByInput>): T[] => {
  const { EntryAsc, EntryDesc, HandleAsc, HandleDesc } = MembershipOrderByInput

  const authorizedKeys = [EntryAsc, EntryDesc, HandleAsc, HandleDesc]
  if (!orderBy || !authorizedKeys.includes(orderBy)) {
    return members
  }

  const [key, direction] = orderBy.toLowerCase().split('_')
  const membersKey = (key === 'entry' ? 'id' : key) as 'id' | 'handle'
  const fact = direction === 'desc' ? 1 : -1
  const sortFn = (a: T, b: T) => fact * (b[membersKey] ?? '').localeCompare(a[membersKey] ?? '')

  return members.sort(sortFn)
}

const paginate = <T extends any>(collection: T[], limit?: Maybe<number>, offset?: Maybe<number>): T[] => {
  const start = (offset ?? 0) * (limit ?? 0)
  return collection.slice(start, start + (limit ?? 0) || undefined)
}

type GetMembersWhereKeys =
  | 'id_eq'
  | 'handle_contains'
  | 'isVerified_eq'
  | 'isFoundingMember_eq'
  | 'rootAccount_in'
  | 'controllerAccount_in'
export const getMembersResolver: QueryResolver<
  {
    where: Pick<MembershipWhereInput, GetMembersWhereKeys>
    orderBy?: MembershipOrderByInput
    limit?: number
    offset?: number
  },
  MockMember[]
> = (obj, { where, orderBy, limit, offset }, { mirageSchema: schema }) => {
  const { id_eq, handle_contains, isVerified_eq, isFoundingMember_eq, rootAccount_in, controllerAccount_in } = where

  const idMatch = id_eq ? getMatcher(id_eq) : undefined
  const isMatch = handle_contains ? getMatcher(handle_contains) : undefined

  const { models } = schema.where(
    'Membership',
    rootAccount_in
      ? (member: MockMember) =>
          rootAccount_in?.includes(member.rootAccount) || controllerAccount_in?.includes(member.controllerAccount)
      : ({ id, handle, isVerified, isFoundingMember }: MockMember) =>
          (idMatch?.(id) || (handle_contains ? isMatch?.(handle) : true)) &&
          (!isVerified_eq || isVerified) &&
          (!isFoundingMember_eq || isFoundingMember)
  )

  return paginate(sort(models, orderBy), limit, offset)
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
    return isMatch(member.handle) || isMatch(member.metadata.name) || isMatch(member.id)
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

export const getWorkingGroupResolver = (obj: any, args: any, context: any, info: any) => {
  const resolverArgs = {
    id: args.where.id,
  }

  return mirageGraphQLFieldResolver(obj, resolverArgs, context, info)
}

export const getWorkingGroupOpeningsResolver: QueryResolver<any, GetWorkingGroupOpeningsQueryResult[]> = (
  parent,
  args,
  { mirageSchema: schema }
) => {
  const { models } = args.where.groupId_eq
    ? schema.where('WorkingGroupOpening', { groupId: args.where.groupId_eq })
    : schema.all('WorkingGroupOpening')

  return adaptRecords(models)
}

export const getWorkingGroupOpeningResolver = (obj: any, args: any, context: any, info: any) => {
  const resolverArgs = {
    id: args.where.id,
  }

  return mirageGraphQLFieldResolver(obj, resolverArgs, context, info)
}

export const getWorkersResolver: QueryResolver<{ where: GetWorkersQueryVariables }, GetWorkersQueryResult[]> = (
  obj,
  args,
  { mirageSchema: schema }
) => {
  const groupId = args.where.groupId_eq

  const { models } = groupId
    ? schema.where('Worker', (worker: MockWorker) => groupId == worker.groupId)
    : schema.all('Worker')

  return models
}

export const getWorkingGroupApplicationsResolver: QueryResolver<
  { where: GetWorkingGroupApplicationsQueryVariables },
  GetWorkingGroupApplicationsQueryResult[]
> = (obj, args, { mirageSchema: schema }) => {
  const applicantIds = args.where.applicantId_in

  const { models } = applicantIds
    ? schema.where('WorkingGroupApplication', (application: MockApplication) =>
        applicantIds.includes(application.applicantId)
      )
    : schema.all('WorkingGroupApplication')

  return models
}

export const getApplicationFormQuestionAnswersResolver: QueryResolver<
  { where: GetApplicationFormQuestionAnswerQueryVariables },
  GetApplicationFormQuestionAnswerQueryResult[]
> = (obj, args, { mirageSchema: schema }) => {
  const applicationId = args.where.applicationId_eq

  const { models } = applicationId
    ? schema.where('ApplicationFormQuestionAnswer', { applicationId })
    : schema.all('ApplicationFormQuestionAnswer')

  return models
}
