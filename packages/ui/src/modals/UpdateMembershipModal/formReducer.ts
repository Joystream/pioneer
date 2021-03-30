import { Account, BaseMember } from '../../common/types'

export interface FormFields {
  rootAccount?: Account
  controllerAccount?: Account
  name: string
  handle: string
  about: string
  avatarUri: string
  isReferred: boolean
  referrer?: BaseMember
  hasTerms: boolean
}

type Action = { type: keyof FormFields; value: string | Account | BaseMember | boolean }

export const formReducer = (state: FormFields, action: Action): FormFields => {
  switch (action.type) {
    case 'name':
    case 'handle':
    case 'about':
    case 'avatarUri':
      return { ...state, [action.type]: action.value as string }
    case 'rootAccount':
    case 'controllerAccount':
      return { ...state, [action.type]: action.value as Account }
    case 'hasTerms':
    case 'isReferred':
      return { ...state, [action.type]: action.value as boolean }
    case 'referrer':
      return { ...state, [action.type]: action.value as BaseMember }
    default:
      return { ...state }
  }
}
