import React from 'react'

import { WorkingGroup } from '@/working-groups/types'

import { Option, OptionsListComponent } from '../../../common/components/selects'

import { OptionWorkingGroup } from './OptionWorkingGroup'

interface Props {
  allWorkingGroups: WorkingGroup[]
  onChange: (option: WorkingGroup) => void
}

export const OptionsListWorkingGroup = React.memo(({ allWorkingGroups, onChange }: Props) => (
  <OptionsListComponent>
    {allWorkingGroups.map((option) => (
      <Option key={option.id} onClick={() => onChange(option)} disabled={!option.leaderId}>
        <OptionWorkingGroup group={option} />
      </Option>
    ))}
  </OptionsListComponent>
))
