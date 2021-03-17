import { Dispatch } from 'react'
import { BaseMember } from '../../../common/types'
import { Action, MemberUpdateFormData } from './MemberProfile'

export type EditProfileProps = {
  isEdit?: boolean
  formData: MemberUpdateFormData
  dispatch: Dispatch<Action>
}

export type WithMember = { member: BaseMember }
