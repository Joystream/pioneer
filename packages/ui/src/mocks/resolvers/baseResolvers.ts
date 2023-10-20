import { adaptRecord, adaptRecords, getRecords } from '@miragejs/graphql/dist/orm/records'
import { getEdges, getPageInfo, getRelayArgs } from '@miragejs/graphql/dist/relay-pagination'
import { unwrapType } from '@miragejs/graphql/dist/utils'
import { GraphQLObjectType, GraphQLSchema } from 'graphql/type'
import { Instantiate } from 'miragejs'
import { AnyRegistry } from 'miragejs/-types'

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
        filters.push((model) => subFilter(model[field] ?? {}))
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
          return toString(model[fieldName]) === String(checkValue)
        })
      }
    }

    if (type === 'not') {
      if (field === 'isTypeOf') {
        filters.push((model: Record<string, any>) => String(model.modelName) !== camelCaseToDash(String(checkValue)))
      } else {
        filters.push((model: Record<string, any>) => {
          const fieldName = getFieldName(model, field)
          return toString(model[fieldName]) !== String(checkValue)
        })
      }
    }

    if (type === 'contains') {
      filters.push((model: Record<string, any>) =>
        String(model[getFieldName(model, field)]).includes(String(checkValue))
      )
    }

    if (type === 'startsWith') {
      filters.push((model: Record<string, any>) =>
        String(model[getFieldName(model, field)]).startsWith(String(checkValue))
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
        filters.push((model: Record<string, any>) => resultToBoolean(model[field] - checkValue))
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
  return (obj, args, { mirageSchema: schema }, info: any) => {
    const { where, limit, offset, orderBy } = args

    let { models } = schema.all(modelName)

    if (orderBy) {
      const schema = info.schema as GraphQLSchema
      const modelType = schema.getType(modelName) as GraphQLObjectType
      const fields = Array.isArray(args.orderBy) ? args.orderBy : [args.orderBy]
      models.sort(getSortBy(fields, modelType))
    }

    if (where) {
      models = models.filter(getFilter(where))
    }

    const start = offset || 0
    const end = parseInt(limit ?? 0) > 0 ? start + limit : undefined
    const pagedRecords = models.slice(start, end)

    return adaptRecords(pagedRecords) as unknown as D
  }
}

export const getInterfaceResolver = <T extends QueryArgs, D>(): WhereQueryResolver<T, D> => {
  return (obj, args, { mirageSchema: schema }) => {
    const { where, limit, offset, orderBy } = args

    let models: Instantiate<AnyRegistry, string>[] | undefined = undefined

    if (where) {
      const type_in = Object.entries(where).find(([key]) => key === 'type_in')?.[1] as string[]
      if (type_in) {
        models = type_in.map((name) => schema.all(name).models).flat()
      }
    }

    if (orderBy?.length > 0 && models) {
      const [key, type] = orderBy[0].split('_')
      const direction = type === 'ASC' ? 1 : -1
      models.sort((a, b) => (a as any)[key]?.toString().localeCompare((b as any)[key]?.toString()) * direction)
    }

    const start = offset || 0
    const end = parseInt(limit ?? 0) > 0 ? start + limit : undefined
    const pagedRecords = models?.slice(start, end)

    return adaptRecords(pagedRecords ?? []) as unknown as D
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

    const { edges: edgesField } = connectionType?.getFields?.() ?? {}
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
      records.sort(getSortBy(fields, nodeType))
    }

    const edges = getEdges(records, relayArgs, nodeType.name) as unknown as D[]

    return {
      edges,
      pageInfo: getPageInfo(records, edges) as PageInfo,
      totalCount: records.length,
    }
  }
}

const getSortBy = ([field, ...fields]: string[], modelType: GraphQLObjectType): ((a: any, b: any) => number) => {
  if (!field) return () => 0

  const [key, type] = field.split('_')
  const nextSort = getSortBy(fields, modelType)
  const direction = type === 'ASC' ? 1 : -1
  return key in modelType.getFields()
    ? (a, b) => a[key]?.toString().localeCompare(b[key]?.toString()) * direction || nextSort(a, b)
    : nextSort
}

const toString = (value: any) => String(value ?? null)
