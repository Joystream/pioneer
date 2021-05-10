import { adaptRecords } from '@miragejs/graphql/dist/orm/records'

import { Filter, QueryArgs, WhereArgs, WhereQueryResolver } from '@/mocks/types'

export const getWhereResolver = <T extends QueryArgs, D>(
  modelName: string,
  filter: (T: WhereArgs<T>) => Filter
): WhereQueryResolver<T, D> => {
  return (obj, args, { mirageSchema: schema }) => {
    const { where, limit } = args

    const { models } = where && filter ? schema.where(modelName, filter(where)) : schema.all(modelName)

    if (limit) {
      models.splice(limit)
    }

    return (adaptRecords(models) as unknown) as D
  }
}
