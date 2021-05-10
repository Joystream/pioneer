import { mirageGraphQLFieldResolver } from '@miragejs/graphql'
import { adaptRecords } from '@miragejs/graphql/dist/orm/records'

import { WorkingGroupWhereUniqueInput } from '@/common/api/queries'
import { QueryResolver } from '@/mocks/resolvers/types'
import { GetWorkingGroupQueryResult, GetWorkingGroupsQueryResult } from '@/working-groups/queries'

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
