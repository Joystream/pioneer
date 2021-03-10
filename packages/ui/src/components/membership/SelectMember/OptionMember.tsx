import React from 'react'
import { BaseMember } from '../../../common/types'
import { MemberInfo } from '../MemberInfo'

interface Props {
  member: BaseMember
}

export const OptionMember = ({ member }: Props) => <MemberInfo member={member} />
