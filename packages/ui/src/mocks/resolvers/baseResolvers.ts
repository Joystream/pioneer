import { adaptRecords, getRecords } from '@miragejs/graphql/dist/orm/records'
import { getEdges, getPageInfo, getRelayArgs } from '@miragejs/graphql/dist/relay-pagination'
import { unwrapType } from '@miragejs/graphql/dist/utils'
import { GraphQLObjectType, GraphQLSchema } from 'graphql/type'

import { PageInfo } from '@/common/api/queries'
import { isNumber } from '@/common/utils'
import { takeAfter, takeBefore } from '@/common/utils/list'
import { ConnectionQueryResolver, Edge, QueryArgs, WhereQueryResolver } from '@/mocks/resolvers/types'

type FilterCallback = (model: Record<string, any>) => boolean

const getFilter = (where: Record<string, any>) => {
  const filters: FilterCallback[] = []

  for (const [key, checkValue] of Object.entries(where)) {
    const [field, type] = key.split('_')

    if (type === 'eq') {
      filters.push((model: Record<string, any>) => String(model[field]) === checkValue.toString())
    }

    if (type === 'contains') {
      filters.push((model: Record<string, any>) => String(model[field]).includes(checkValue.toString()))
    }

    if (type === 'in') {
      filters.push((model: Record<string, any>) => checkValue.includes(model[field]))
    }
  }

  return (model: any) => filters.every((value) => value(model))
}

export const getWhereResolver = <T extends QueryArgs, D>(modelName: string): WhereQueryResolver<T, D> => {
  return (obj, args, { mirageSchema: schema }) => {
    const { where, limit } = args

    let { models } = schema.all(modelName)

    if (where) {
      models = models.filter(getFilter(where))
    }

    if (limit) {
      models.splice(limit)
    }

    return (adaptRecords(models) as unknown) as D
  }
}

export const getConnectionResolver = <T extends QueryArgs, D extends Edge>(
  typeName: string
): ConnectionQueryResolver<T, D> => {
  return (obj, args, context, info: any) => {
    const schema = info.schema as GraphQLSchema
    const connectionType = schema.getType(typeName) as GraphQLObjectType

    const { edges: edgesField } = connectionType?.getFields()
    const { type: edgeType } = unwrapType(edgesField.type)
    const { type: nodeType } = unwrapType(edgeType.getFields().node.type)
    const { relayArgs, nonRelayArgs } = getRelayArgs({})

    // We don't have filtering yet so simple where is sufficient
    let records = getRecords(nodeType, nonRelayArgs, context.mirageSchema)

    if (args.orderBy) {
      const [field, order] = args.orderBy.split('_')

      if (field in nodeType.getFields()) {
        records.sort((a, b) => {
          return a[field]?.toString().localeCompare(b[field]?.toString()) * (order === 'ASC' ? 1 : -1)
        })
      }
    }

    if (args.where) {
      records = records.filter(getFilter(args.where))
    }

    let edges = (getEdges(records, relayArgs, nodeType.name) as unknown) as D[]

    // Mock Pagination
    const { after, before, first, last } = args
    if (after) {
      edges = takeAfter(({ cursor }: D) => cursor === after, edges)
    }
    if (before) {
      edges = takeBefore(({ cursor }: D) => cursor === before, edges)
    }
    if (isNumber(first) || isNumber(last)) {
      const end = isNumber(first) ? first : undefined
      const start = isNumber(last) ? (end ?? 0) - last : 0
      edges = edges.slice(start, end)
    }

    return {
      edges,
      pageInfo: getPageInfo(records, edges) as PageInfo,
      totalCount: records.length,
    }
  }
}
