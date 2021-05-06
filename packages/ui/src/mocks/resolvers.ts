import { mirageGraphQLFieldResolver } from '@miragejs/graphql'
import { adaptRecords } from '@miragejs/graphql/dist/orm/records'

import { MembershipOrderByInput, WorkingGroupWhereUniqueInput } from '../common/api/queries'
import {
  GetMembersQueryResult,
  GetMembersQueryVariables,
  MemberFieldsFragment,
  SearchMembersQueryResult,
} from '../memberships/queries'
import {
  GetApplicationFormQuestionAnswerQueryResult,
  GetApplicationFormQuestionAnswerQueryVariables,
  GetWorkersQueryResult,
  GetWorkersQueryVariables,
  GetWorkingGroupApplicationsQueryResult,
  GetWorkingGroupApplicationsQueryVariables,
  GetWorkingGroupOpeningsQueryResult,
  GetWorkingGroupQueryResult,
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

type SortFn = (a: MockMember, b: MockMember) => number
const getSortFn = (orderBy?: MembershipOrderByInput): void | SortFn => {
  const { EntryAsc, EntryDesc, HandleAsc, HandleDesc } = MembershipOrderByInput

  const authorizedKeys = [EntryAsc, EntryDesc, HandleAsc, HandleDesc]
  if (!orderBy || !authorizedKeys.includes(orderBy)) {
    return
  }

  const [key, direction] = orderBy.toLowerCase().split('_')
  const membersKey = (key === 'entry' ? 'id' : key) as 'id' | 'handle'
  const fact = direction === 'desc' ? 1 : -1

  return (a, b) => fact * (b[membersKey] ?? '').localeCompare(a[membersKey] ?? '')
}

export const getMembersResolver: QueryResolver<
  {
    where: GetMembersQueryVariables
    orderBy?: MembershipOrderByInput
  },
  GetMembersQueryResult[]
> = (obj, args, { mirageSchema: schema }) => {
  const rootAccountIn = args.where.rootAccount_in
  const controllerAccountIn = args.where.controllerAccount_in
  const sortFn = getSortFn(args.orderBy)

  const { models } = rootAccountIn
    ? schema.where(
        'Membership',
        (member: MockMember) =>
          rootAccountIn?.includes(member.rootAccount) || controllerAccountIn?.includes(member.controllerAccount)
      )
    : schema.all('Membership')

  return sortFn ? models.sort(sortFn) : models
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

export const getWorkingGroupResolver: QueryResolver<WorkingGroupWhereUniqueInput, GetWorkingGroupQueryResult> = (
  obj: any,
  args: any,
  { mirageSchema: schema },
  info: any
) => {
  const name_eq = args.where.name_eq

  const { models } = schema.where(
    'WorkingGroup',
    (group: { name: string }) => group.name.toLowerCase() === name_eq.toLowerCase()
  )

  return adaptRecords(models)[0]
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
