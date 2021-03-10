import React from 'react'
import { BaseMember } from '../../../common/types'
import { MemberInfo } from '../../membership/MemberInfo'
import { OptionComponent, OptionComponentContainer } from '../selects'

interface Props {
  member: BaseMember
  onChange?: (member: BaseMember) => void
}

export function OptionMember({ member, onChange }: Props) {
  return (
    <OptionComponentContainer onClick={() => onChange && onChange(member)}>
      <OptionComponent>
        <MemberInfo member={member} />
      </OptionComponent>
    </OptionComponentContainer>
  )
}
