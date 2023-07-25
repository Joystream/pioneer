export type Reducer<Accumulator, Value = Accumulator> = (acc: Accumulator, value: Value, index: number) => Accumulator

export type Defined<T> = T extends undefined ? never : T

export type EnumTypeString<TEnum extends string> = { [key in string]: TEnum | string }

export type KeysOfUnion<T> = T extends T ? keyof T : never

export type Awaited<T> = T extends PromiseLike<infer U> ? U : T

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends infer U // This line distributes union types
    ? U extends object
      ? RecursivePartial<U>
      : U
    : never
}
