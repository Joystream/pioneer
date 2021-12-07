/* eslint-disable @typescript-eslint/no-unused-vars */
// See https://spin.atomicobject.com/2021/11/10/discriminated-unions-typescript-project

type TypedUnion<TypeKey extends string, TypeValue extends string = string> = { [key in TypeKey]: TypeValue }
type CastTypedUnion<
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
    result ? (result as CastTypedUnion<Result, TypeKey, TypeValue>) : undefined

export const castQueryResult = castTypedUnion('__typename')
