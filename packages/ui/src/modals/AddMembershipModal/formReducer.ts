import { Account } from '../../common/types'

export interface FormFields {
  rootAccount: Account | undefined
  controllerAccount: Account | undefined
  name: string
  handle: string
  about: string
  avatarURI: string
  isReferred: boolean
  hasTerms: boolean
}

type Action = { type: keyof FormFields; value: string | Account | boolean }
export const formReducer = (state: FormFields, action: Action): FormFields => {
  switch (action.type) {
    case 'name':
    case 'handle':
    case 'about':
    case 'avatarURI':
      return { ...state, [action.type]: action.value as string }
    case 'rootAccount':
    case 'controllerAccount':
      return { ...state, [action.type]: action.value as Account }
    case 'hasTerms':
    case 'isReferred':
      return { ...state, [action.type]: action.value as boolean }
    default:
      return { ...state }
  }
}
