import React from 'react'

import { MemberInternal } from '../../types'
import { MemberInfo } from '../MemberInfo'

interface Props {
  member: MemberInternal
}

export const OptionMember = ({ member }: Props) => <MemberInfo member={member} />
