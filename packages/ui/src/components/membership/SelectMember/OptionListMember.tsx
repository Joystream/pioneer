import React from 'react'
import { BaseMember } from '../../../common/types'
import { Option, OptionListProps, OptionsListComponent } from '../../selects'
import { OptionMember } from './OptionMember'

export const OptionListMember = React.memo(({ options, onChange }: OptionListProps<BaseMember>) => (
  <OptionsListComponent>
    {options.map((option) => (
      <Option key={option.handle} onClick={() => onChange && onChange(option)}>
        <OptionMember member={option} />
      </Option>
    ))}
  </OptionsListComponent>
))
