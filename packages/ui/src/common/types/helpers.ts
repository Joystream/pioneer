export type Reducer<Accumulator, Value = Accumulator> = (acc: Accumulator, value: Value) => Accumulator
