import { Reducer } from 'react'

import { Account } from '../../common/types'

export interface UpdateMemberForm {
  id: string
  name?: string
  handle?: string
  avatarUri?: string
  about?: string
  rootAccount?: Account
  controllerAccount?: Account
}

export type Action<T> = {
  type: keyof T
  value?: T[keyof T]
}
export type FormReducer<T> = Reducer<T, Action<T>>

export type WithNullableValues<T> = { [P in keyof T]: T[P] | null }
