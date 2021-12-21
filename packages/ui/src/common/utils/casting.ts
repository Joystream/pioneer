/* eslint-disable @typescript-eslint/no-unused-vars */
// See https://spin.atomicobject.com/2021/11/10/discriminated-unions-typescript-project

type TypedUnion<TypeKey extends string, TypeValue extends string = string> = { [key in TypeKey]: TypeValue }
export type NarrowTypedUnion<
  Union extends TypedUnion<TypeKey>,
  TypeKey extends string,
  TypeValue extends Union[TypeKey]
> = Union extends TypedUnion<TypeKey, TypeValue>
  ? Union
  : TypeValue extends Union[TypeKey]
  ? Omit<Union, TypeKey> & TypedUnion<TypeKey, TypeValue>
  : never

export const castTypedUnion =
  <TypeKey extends string>(typeKey: TypeKey) =>
  <Result extends TypedUnion<TypeKey>, TypeValue extends Result[TypeKey]>(
    result: Result | null | undefined,
    typeValue: TypeValue
  ) =>
    result ? (result as NarrowTypedUnion<Result, TypeKey, TypeValue>) : undefined

export type NarrowQueryResult<
  QueryResult extends TypedUnion<'__typename'>,
  TypeName extends QueryResult['__typename']
> = NarrowTypedUnion<QueryResult, '__typename', TypeName>

export const castQueryResult = castTypedUnion('__typename')
