export type WithNullableValues<T> = { [P in keyof T]: T[P] | null }
