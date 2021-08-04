import { adaptRecord, adaptRecords, getRecords } from '@miragejs/graphql/dist/orm/records'
import { getEdges, getPageInfo, getRelayArgs } from '@miragejs/graphql/dist/relay-pagination'
import { unwrapType } from '@miragejs/graphql/dist/utils'
import { GraphQLObjectType, GraphQLSchema } from 'graphql/type'

import { PageInfo } from '@/common/api/queries'
import { camelCaseToDash } from '@/mocks/helpers'
import {
  ConnectionQueryResolver,
  Edge,
  QueryArgs,
  UniqueQueryResolver,
  WhereQueryResolver,
} from '@/mocks/resolvers/types'

type FilterCallback = (model: Record<string, any>) => boolean

function getFieldName(model: Record<string, any>, field: string) {
  return [`${field}Id`, `${field}Ids`].find((key) => key in model) ?? field
}

const getFilter = (where: Record<string, any>, nestedField?: string) => {
  const filters: FilterCallback[] = []

  for (const [key, checkValue] of Object.entries(where)) {
    const [field, type] = key.split('_')

    if (!type) {
      filters.push(getFilter(checkValue, field))

      continue
    }

    if (type === 'eq') {
      if (field === 'isTypeOf') {
        filters.push((model: Record<string, any>) => {
          return String(model[nestedField as string].modelName) === camelCaseToDash(checkValue.toString())
        })
      } else {
        filters.push((model: Record<string, any>) => {
          const fieldName = getFieldName(model, nestedField ? nestedField : field)
          return String(model[fieldName]) === checkValue.toString()
        })
      }
    }

    if (type === 'not') {
      if (field === 'isTypeOf') {
        filters.push((model: Record<string, any>) => {
          return String(model[nestedField as string].modelName) !== camelCaseToDash(checkValue.toString())
        })
      } else {
        filters.push((model: Record<string, any>) => {
          const fieldName = getFieldName(model, nestedField ? nestedField : field)
          return String(model[fieldName]) !== checkValue.toString()
        })
      }
    }

    if (type === 'contains') {
      filters.push((model: Record<string, any>) =>
        String(model[getFieldName(model, field)]).includes(checkValue.toString())
      )
    }

    if (type === 'in') {
      if (field === 'isTypeOf') {
        filters.push((model: Record<string, any>) => {
          return checkValue
            .map((value: string) => camelCaseToDash(value))
            .includes(String(model[nestedField as string].modelName))
        })
      } else {
        filters.push((model: Record<string, any>) => {
          const fieldName = getFieldName(model, field)

          return checkValue.includes(model[fieldName]) || checkValue.includes(String(model[fieldName]))
        })
      }
    }

    if (['gte', 'lte'].includes(type)) {
      const resultToBoolean: (a: number) => boolean = type == 'gte' ? (a) => a >= 0 : (a) => a <= 0
      if (['createdAt', 'statusSetAtTime'].includes(field)) {
        filters.push((model: Record<string, any>) =>
          resultToBoolean(new Date(model[field]).getTime() - new Date(checkValue).getTime())
        )
      } else {
        filters.push((model: Record<string, any>) =>
          resultToBoolean(String(model[field]).localeCompare(checkValue.toString()))
        )
      }
    }

    if (type === 'json') {
      filters.push(getFilter(checkValue, field))
    }
  }

  return (model: any) => filters.every((value) => value(model))
}

export const getWhereResolver = <T extends QueryArgs, D>(modelName: string): WhereQueryResolver<T, D> => {
  return (obj, args, { mirageSchema: schema }) => {
    const { where, limit, offset } = args

    let { models } = schema.all(modelName)

    if (where) {
      models = models.filter(getFilter(where))
    }

    const start = offset || 0
    const end = parseInt(limit ?? 0) > 0 ? start + limit : undefined
    const pagedRecords = models.slice(start, end)

    return (adaptRecords(pagedRecords) as unknown) as D
  }
}

export const getUniqueResolver = <T extends QueryArgs, D>(modelName: string): UniqueQueryResolver<T, D> => {
  return (obj, args, { mirageSchema: schema }) => {
    const model = schema.findBy(modelName, args.where)

    return adaptRecord(model) as D
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
    const { relayArgs } = getRelayArgs(args)

    // We don't have filtering yet so simple where is sufficient
    let records = getRecords(nodeType, {}, context.mirageSchema)

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

    const edges = (getEdges(records, relayArgs, nodeType.name) as unknown) as D[]

    return {
      edges,
      pageInfo: getPageInfo(records, edges) as PageInfo,
      totalCount: records.length,
    }
  }
}
