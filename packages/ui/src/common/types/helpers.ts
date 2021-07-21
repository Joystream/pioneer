export type Reducer<Accumulator, Value = Accumulator> = (acc: Accumulator, value: Value, index: number) => Accumulator

export type MakeTransient<T, K extends keyof T & string> = Omit<T, K> & { [P in `$${K}`]: T[K] }
