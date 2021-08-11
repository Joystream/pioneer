export type Reducer<Accumulator, Value = Accumulator> = (acc: Accumulator, value: Value, index: number) => Accumulator

// From https://stackoverflow.com/a/54487392/4065560
export type DataFields<T> = T extends Record<'__typename', any>
  ? Omit<{ [K in keyof T]: DataFields<T[K]> }, '__typename'>
  : T extends (infer U)[]
  ? DataFields<U>[]
  : T
