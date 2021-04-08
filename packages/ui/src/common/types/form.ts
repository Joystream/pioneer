import { Reducer } from 'react'

export type Action<T> = {
  type: keyof T
  value?: T[keyof T]
}

export type FormReducer<T> = Reducer<T, Action<T>>

export type WithNullableValues<T> = { [P in keyof T]: T[P] | null }
