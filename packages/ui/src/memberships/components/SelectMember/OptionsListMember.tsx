import React from 'react'

import { Option, OptionsListComponent } from '../../../common/components/selects'
import { MemberInternal } from '../../types'

import { OptionMember } from './OptionMember'

interface Props {
  allMembers: MemberInternal[]
  onChange: (option: MemberInternal) => void
}

export const OptionsListMember = React.memo(({ allMembers, onChange }: Props) => (
  <OptionsListComponent>
    {allMembers.map((option) => (
      <Option key={option.handle} onClick={() => onChange(option)}>
        <OptionMember member={option} />
      </Option>
    ))}
  </OptionsListComponent>
))
