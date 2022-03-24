import React from 'react'

import { WorkingGroup } from '@/working-groups/types'

import { Option, OptionsListComponent } from '../../../common/components/selects'

import { OptionWorkingGroup } from './OptionWorkingGroup'

interface Props {
  allWorkingGroups: WorkingGroup[]
  onChange: (option: WorkingGroup) => void
  disableNoLead?: boolean
}

export const OptionsListWorkingGroup = React.memo(({ allWorkingGroups, onChange, disableNoLead }: Props) => {
  //TODO has to be deleted when gateway will be implemented
  const filteredWorkingGroups = allWorkingGroups.filter((options) => options.name !== 'Gateway')

  return (
    <OptionsListComponent>
      {filteredWorkingGroups.map((option) => (
        <Option key={option.id} onClick={() => onChange(option)} disabled={disableNoLead && !option.leadId}>
          <OptionWorkingGroup group={option} disabledNoLead={disableNoLead && !option.leadId} />
        </Option>
      ))}
    </OptionsListComponent>
  )
})
