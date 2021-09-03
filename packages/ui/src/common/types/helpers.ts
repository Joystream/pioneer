export type Reducer<Accumulator, Value = Accumulator> = (acc: Accumulator, value: Value, index: number) => Accumulator

export type Defined<T> = T extends undefined ? never : T
