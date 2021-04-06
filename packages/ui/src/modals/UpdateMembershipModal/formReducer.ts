import { FormReducer, UpdateMemberForm } from './types'

export const updateReducer: FormReducer<UpdateMemberForm> = (state, action): UpdateMemberForm => {
  return { ...state, [action.type]: action.value }
}
