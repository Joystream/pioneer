import { adaptRecords, getRecords } from '@miragejs/graphql/dist/orm/records'
import { getEdges, getPageInfo, getRelayArgs } from '@miragejs/graphql/dist/relay-pagination'
import { unwrapType } from '@miragejs/graphql/dist/utils'
import { GraphQLObjectType, GraphQLSchema } from 'graphql/type'

import { PageInfo } from '@/common/api/queries'
import { ConnectionQueryResolver, Filter, QueryArgs, WhereArgs, WhereQueryResolver } from '@/mocks/types'

export const getWhereResolver = <T extends QueryArgs, D>(
  modelName: string,
  filter: (T: WhereArgs<T>) => Filter
): WhereQueryResolver<T, D> => {
  return (obj, args, { mirageSchema: schema }) => {
    const { where, limit } = args

    const { models } = schema.all(modelName)

    if (where) {
      models.filter(filter(where))
    }

    if (limit) {
      models.splice(limit)
    }

    return (adaptRecords(models) as unknown) as D
  }
}

export const getConnectionResolver = <T extends QueryArgs, D>(typeName: string): ConnectionQueryResolver<T, D> => {
  return (obj, args, context, info) => {
    const schema = (info as any).schema as GraphQLSchema
    const connectionType = schema.getType(typeName) as GraphQLObjectType

    const { edges: edgesField } = connectionType?.getFields()
    const { type: edgeType } = unwrapType(edgesField.type)
    const { type: nodeType } = unwrapType(edgeType.getFields().node.type)
    const { relayArgs, nonRelayArgs } = getRelayArgs({})

    // We don't have filtering yet so simple where is sufficient
    const records = getRecords(nodeType, nonRelayArgs, context.mirageSchema)

    if (args.orderBy) {
      const [field, order] = args.orderBy.split('_')

      if (field in nodeType.getFields()) {
        records.sort((a, b) => {
          return a[field]?.toString().localeCompare(b[field]?.toString()) * (order === 'ASC' ? 1 : -1)
        })
      }
    }

    const edges = (getEdges(records, relayArgs, nodeType.name) as unknown) as D[]

    return {
      edges,
      pageInfo: getPageInfo(records, edges) as PageInfo,
      totalCount: records.length,
    }
  }
}
