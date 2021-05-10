import { AnyRegistry } from 'miragejs/-types'
import Schema from 'miragejs/orm/schema'

export type WhereQueryResolver<QueryArgs, ReturnType = unknown> = (
  obj: unknown,
  args: QueryArgs,
  context: { mirageSchema: Schema<AnyRegistry> },
  info: unknown
) => ReturnType

export interface QueryArgs {
  offset?: any
  limit?: any
  where?: any
  orderBy?: any
}

export type Filter = (a: any) => boolean
export type WhereArgs<T extends QueryArgs> = T['where']
export type QueryResolver<ArgsType extends Record<string, unknown>, ReturnType = unknown> = (
  obj: unknown,
  args: ArgsType,
  context: { mirageSchema: any },
  info: unknown
) => ReturnType
