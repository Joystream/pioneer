import React from 'react'
import { BaseMember } from '../../../common/types'
import { OptionsListComponent } from '../selects'
import { OptionListProps } from '../types'
import { OptionMember } from './OptionMember'

export const OptionListMember = React.memo(({ options, onChange }: OptionListProps<BaseMember>) => (
  <OptionsListComponent>
    {options.map((member) => (
      <OptionMember key={member.handle} member={member} onChange={onChange} />
    ))}
  </OptionsListComponent>
))
