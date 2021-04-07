import React from 'react'

import { BaseMember } from '../../../types'
import { Option, OptionsListComponent } from '../../selects'
import { OptionMember } from './OptionMember'

interface Props {
  allMembers: BaseMember[]
  onChange: (option: BaseMember) => void
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
