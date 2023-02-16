export type Reducer<Accumulator, Value = Accumulator> = (acc: Accumulator, value: Value, index: number) => Accumulator

export type Defined<T> = T extends undefined ? never : T

export type EnumTypeString<TEnum extends string> = { [key in string]: TEnum | string }

export type KeysOfUnion<T> = T extends T ? keyof T : never

export type Awaited<T> = T extends PromiseLike<infer U> ? U : T
