import React from 'react'

import { OptionWorkingGroupApplication } from '@/working-groups/components/SelectWorkingGroupApplication/OptionWorkingGroupApplication'
import { WorkingGroupApplication } from '@/working-groups/types/WorkingGroupApplication'

import { Option, OptionsListComponent } from '../../../common/components/selects'

interface Props {
  allWorkingGroupApplications: WorkingGroupApplication[]
  onChange: (option: WorkingGroupApplication) => void
}

export const OptionsListWorkingGroupApplication = React.memo(({ allWorkingGroupApplications, onChange }: Props) => (
  <OptionsListComponent>
    {allWorkingGroupApplications.map((option) => (
      <Option key={option.id} onClick={() => onChange(option)}>
        <OptionWorkingGroupApplication application={option} />
      </Option>
    ))}
  </OptionsListComponent>
))
