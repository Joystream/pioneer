import { AnyRegistry } from 'miragejs/-types'
import Schema from 'miragejs/orm/schema'

import { PageInfo } from '@/common/api/queries'

export interface ConnectionResult<T> {
  edges: T[]
  pageInfo: PageInfo
  totalCount: number
}

export type ConnectionQueryResolver<QueryArgs, ReturnType = unknown> = (
  obj: unknown,
  args: QueryArgs,
  context: { mirageSchema: Schema<AnyRegistry> },
  info: unknown
) => ConnectionResult<ReturnType>

export type WhereQueryResolver<QueryArgs, ReturnType = unknown> = (
  obj: unknown,
  args: QueryArgs,
  context: { mirageSchema: Schema<AnyRegistry> },
  info: unknown
) => ReturnType

export type UniqueQueryResolver<QueryArgs, ReturnType = unknown> = (
  obj: unknown,
  args: QueryArgs,
  context: { mirageSchema: Schema<AnyRegistry> },
  info: unknown
) => ReturnType

export interface QueryArgs {
  offset?: any
  limit?: any
  first?: number
  after?: string
  last?: number
  before?: string
  where?: any
  orderBy?: any
}

export interface Edge {
  node: any
  cursor: string
}

export type Filter = (a: any) => boolean

export type WhereArgs<T extends QueryArgs> = T['where']

export type QueryResolver<ArgsType extends Record<string, unknown>, ReturnType = unknown> = (
  obj: unknown,
  args: ArgsType,
  context: { mirageSchema: any },
  info: unknown
) => ReturnType
