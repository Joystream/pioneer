import React from 'react'

import { Member } from '../../types'
import { MemberInfo } from '../MemberInfo'

interface Props {
  member: Member
}

export const OptionMember = ({ member }: Props) => <MemberInfo member={member} skipModal />
