import React from 'react'

import { Option, OptionsListComponent } from '@/common/components/selects'
import { WorkingGroup } from '@/working-groups/types'

import { OptionWorkingGroup } from './OptionWorkingGroup'

interface Props {
  allWorkingGroups: WorkingGroup[]
  onChange: (option: WorkingGroup) => void
  disableNoLead?: boolean
}

export const OptionsListWorkingGroup = React.memo(({ allWorkingGroups, onChange, disableNoLead }: Props) => {
  return (
    <OptionsListComponent>
      {allWorkingGroups.map((option) => (
        <Option key={option.id} onClick={() => onChange(option)} disabled={disableNoLead && !option.leadId}>
          <OptionWorkingGroup group={option} disabledNoLead={disableNoLead && !option.leadId} />
        </Option>
      ))}
    </OptionsListComponent>
  )
})
