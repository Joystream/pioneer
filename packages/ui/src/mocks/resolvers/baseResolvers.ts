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

const getFilter = (where: Record<string, any>) => {
  const filters: FilterCallback[] = []

  for (const [key, checkValue] of Object.entries(where)) {
    const [field, type] = key.split('_')

    if (!type) {
      if (['OR', 'AND'].includes(field)) {
        const subFilters: FilterCallback[] = checkValue.map((where: Record<string, any>) => getFilter(where))
        const method = key === 'OR' ? 'some' : 'every'
        filters.push((model) => subFilters[method]((subfilter) => subfilter(model)))
      } else {
        const subFilter = getFilter(checkValue)
        filters.push((model) => subFilter(model[field]))
      }

      continue
    }

    if (type === 'eq') {
      if (field === 'isTypeOf') {
        filters.push((model: Record<string, any>) => {
          return String(model.modelName) === camelCaseToDash(String(checkValue))
        })
      } else {
        filters.push((model: Record<string, any>) => {
          const fieldName = getFieldName(model, field)
          return String(model[fieldName]) === String(checkValue)
        })
      }
    }

    if (type === 'not') {
      if (field === 'isTypeOf') {
        filters.push((model: Record<string, any>) => String(model.modelName) !== camelCaseToDash(String(checkValue)))
      } else {
        filters.push((model: Record<string, any>) => {
          const fieldName = getFieldName(model, field)
          return String(model[fieldName]) !== String(checkValue)
        })
      }
    }

    if (type === 'contains') {
      filters.push((model: Record<string, any>) =>
        String(model[getFieldName(model, field)]).includes(String(checkValue))
      )
    }

    if (type === 'in') {
      if (field === 'isTypeOf') {
        filters.push((model: Record<string, any>) =>
          checkValue.map((value: string) => camelCaseToDash(value)).includes(String(model.modelName))
        )
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
          resultToBoolean(String(model[field]).localeCompare(String(checkValue)))
        )
      }
    }

    if (type === 'json') {
      const subFilter = getFilter(checkValue)
      filters.push((model) => subFilter(model[field]))
    }

    if (['none', 'some', 'every'].includes(type)) {
      const subFilter = getFilter(checkValue)
      const method = (type === 'none' ? 'some' : type) as 'some' | 'every'
      filters.push((model: Record<string, any>) => {
        const result: boolean = model[field]?.models[method]?.(subFilter)
        return type === 'none' ? !result : result
      })
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

    if (args.where) {
      records = records.filter(getFilter(args.where))
    }

    if (args.orderBy) {
      const fields = Array.isArray(args.orderBy) ? args.orderBy : [args.orderBy]
      const sortBy = ([field, ...fields]: string[]): ((a: any, b: any) => number) => {
        if (!field) return () => 0

        const [key, type] = field.split('_')
        const nextSort = sortBy(fields)
        const direction = type === 'ASC' ? 1 : -1
        return key in nodeType.getFields()
          ? (a, b) => a[key]?.toString().localeCompare(b[key]?.toString()) * direction || nextSort(a, b)
          : nextSort
      }
      records.sort(sortBy(fields))
    }

    const edges = (getEdges(records, relayArgs, nodeType.name) as unknown) as D[]

    return {
      edges,
      pageInfo: getPageInfo(records, edges) as PageInfo,
      totalCount: records.length,
    }
  }
}
