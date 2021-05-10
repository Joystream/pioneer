import { mirageGraphQLFieldResolver } from '@miragejs/graphql'
import { adaptRecords, getRecords } from '@miragejs/graphql/dist/orm/records'
import { getEdges, getPageInfo, getRelayArgs } from '@miragejs/graphql/dist/relay-pagination'
import { unwrapType } from '@miragejs/graphql/dist/utils'

import { getWhereResolver } from '@/mocks/baseResolvers'
import { QueryResolver } from '@/mocks/types'

import {
  ApplicationFormQuestionAnswer,
  Maybe,
  MembershipOrderByInput,
  MembershipWhereInput,
  QueryApplicationFormQuestionAnswersArgs,
  QueryWorkersArgs,
  QueryWorkingGroupApplicationsArgs,
  QueryWorkingGroupOpeningsArgs,
  Worker,
  WorkingGroupApplication,
  WorkingGroupOpening,
  WorkingGroupWhereUniqueInput,
} from '../common/api/queries'
import { MemberFieldsFragment, SearchMembersQueryResult } from '../memberships/queries'
import {
  GetApplicationFormQuestionAnswerQueryResult,
  GetWorkersQueryResult,
  GetWorkingGroupApplicationsQueryResult,
  GetWorkingGroupOpeningsQueryResult,
  GetWorkingGroupQueryResult,
  GetWorkingGroupsQueryResult,
} from '../working-groups/queries'

import { MockMember } from './data'

export const getMemberResolver = (obj: any, args: any, context: any, info: any) => {
  const resolverArgs = {
    id: args.where.id,
  }

  return mirageGraphQLFieldResolver(obj, resolverArgs, context, info)
}

type SortableKeys = keyof SortableQueryResult
interface SortableQueryResult {
  id: string
  handle: string
}
const sort = <T extends SortableQueryResult>(members: T[], orderBy?: Maybe<MembershipOrderByInput>): T[] => {
  const sortByKey = (key: SortableKeys, direction: number) => (a: T, b: T) =>
    direction * (b[key] ?? '').localeCompare(a[key] ?? '')

  const { EntryAsc, EntryDesc, HandleAsc, HandleDesc } = MembershipOrderByInput

  const authorizedKeys = [EntryAsc, EntryDesc, HandleAsc, HandleDesc]
  if (!orderBy || !authorizedKeys.includes(orderBy)) {
    return members
  }

  const [key, direction] = orderBy.toLowerCase().split('_')
  const membersKey = (key === 'entry' ? 'id' : key) as SortableKeys

  return members.sort(sortByKey(membersKey, direction === 'desc' ? 1 : -1))
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

  const isMatch = handle_contains ? getMatcher(handle_contains) : undefined

  const { models } = schema.where(
    'Membership',
    rootAccount_in
      ? (member: MockMember) =>
          rootAccount_in?.includes(member.rootAccount) || controllerAccount_in?.includes(member.controllerAccount)
      : ({ id, handle, isVerified, isFoundingMember }: MockMember) =>
          (id_eq ? id === id_eq : handle_contains ? isMatch?.(handle) : true) &&
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

export const membershipsConnectionResolver: QueryResolver<any, any> = (obj, args, context, info) => {
  const connectionType = (info as any).schema.getType('MembershipConnection')

  const { edges: edgesField } = connectionType.getFields()
  const { type: edgeType } = unwrapType(edgesField.type)
  const { type: nodeType } = unwrapType(edgeType.getFields().node.type)
  const { relayArgs, nonRelayArgs } = getRelayArgs({})

  // We don't have filtering yet so simple where is sufficient
  const records = getRecords(nodeType, nonRelayArgs, context.mirageSchema)

  if (args.orderBy) {
    const [field, order] = args.orderBy.split('_')

    if (field in (info as any).schema.getType('Membership').getFields()) {
      records.sort((a, b) => {
        return a[field]?.toString().localeCompare(b[field]?.toString()) * (order === 'ASC' ? 1 : -1)
      })
    }
  }

  const edges = getEdges(records, relayArgs, nodeType.name)

  return {
    edges,
    pageInfo: getPageInfo(records, edges),
    totalCount: records.length,
  }
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
  { mirageSchema: schema }
) => {
  const name_eq = args.where.name

  const { models } = schema.where(
    'WorkingGroup',
    (group: { name: string }) => group.name.toLowerCase() === name_eq.toLowerCase()
  )

  return adaptRecords(models)[0]
}

export const getWorkingGroupOpeningResolver = (obj: any, args: any, context: any, info: any) => {
  const resolverArgs = {
    id: args.where.id,
  }

  return mirageGraphQLFieldResolver(obj, resolverArgs, context, info)
}

export const getWorkingGroupOpeningsResolver = getWhereResolver<
  QueryWorkingGroupOpeningsArgs,
  GetWorkingGroupOpeningsQueryResult
>('WorkingGroupOpening', (where) => {
  return (opening: WorkingGroupOpening) => opening.groupId === where?.groupId_eq
})

export const getWorkersResolver = getWhereResolver<QueryWorkersArgs, GetWorkersQueryResult>('Worker', (where) => {
  return (worker: Worker) => worker.groupId === where?.groupId_eq
})

export const getWorkingGroupApplicationsResolver = getWhereResolver<
  QueryWorkingGroupApplicationsArgs,
  GetWorkingGroupApplicationsQueryResult
>('WorkingGroupApplication', (where) => {
  return (application: WorkingGroupApplication) => {
    return where?.applicantId_in?.includes(application.applicantId) ?? false
  }
})

export const getApplicationFormQuestionAnswersResolver = getWhereResolver<
  QueryApplicationFormQuestionAnswersArgs,
  GetApplicationFormQuestionAnswerQueryResult
>('ApplicationFormQuestionAnswer', (where) => {
  return (answer: ApplicationFormQuestionAnswer) => answer.applicationId === where?.applicationId_eq
})
