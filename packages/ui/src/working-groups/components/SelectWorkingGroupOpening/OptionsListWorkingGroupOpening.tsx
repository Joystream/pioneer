import React from 'react'

import { OptionWorkingGroupOpening } from '@/working-groups/components/SelectWorkingGroupOpening/OptionWorkingGroupOpening'
import { WorkingGroupOpening } from '@/working-groups/types'

import { Option, OptionsListComponent } from '../../../common/components/selects'


interface Props {
  allOpenings: WorkingGroupOpening[]
  onChange: (option: WorkingGroupOpening) => void
}

export const OptionsListWorkingGroupOpening = React.memo(({ allOpenings, onChange }: Props) => (
  <OptionsListComponent>
    {allOpenings.map((option) => (
      <Option key={option.id} onClick={() => onChange(option)}>
        <OptionWorkingGroupOpening opening={option} />
      </Option>
    ))}
  </OptionsListComponent>
))
