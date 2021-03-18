import { Account, BaseMember } from '../../common/types'

export interface FormFields {
  rootAccount?: Account
  controllerAccount?: Account
  name: string
  handle: string
  about: string
  avatarURI: string
  isReferred?: boolean
  referrer?: BaseMember
  hasTerms?: boolean
  invitor?: BaseMember
}

type Action = { type: keyof FormFields; value: string | Account | BaseMember | boolean }

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
    case 'referrer':
      return { ...state, [action.type]: action.value as BaseMember }
    case 'invitor':
      return { ...state, [action.type]: action.value as BaseMember }
    default:
      return { ...state }
  }
}
