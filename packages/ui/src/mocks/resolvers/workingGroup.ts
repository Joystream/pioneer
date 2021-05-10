import { mirageGraphQLFieldResolver } from '@miragejs/graphql'
import { adaptRecords } from '@miragejs/graphql/dist/orm/records'

import {
  ApplicationFormQuestionAnswer,
  QueryApplicationFormQuestionAnswersArgs,
  QueryWorkersArgs,
  QueryWorkingGroupApplicationsArgs,
  QueryWorkingGroupOpeningsArgs,
  Worker,
  WorkingGroupApplication,
  WorkingGroupOpening,
  WorkingGroupWhereUniqueInput,
} from '@/common/api/queries'
import { getWhereResolver } from '@/mocks/baseResolvers'
import { QueryResolver } from '@/mocks/types'
import {
  GetApplicationFormQuestionAnswerQueryResult,
  GetWorkersQueryResult,
  GetWorkingGroupApplicationsQueryResult,
  GetWorkingGroupOpeningsQueryResult,
  GetWorkingGroupQueryResult,
  GetWorkingGroupsQueryResult,
} from '@/working-groups/queries'

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
