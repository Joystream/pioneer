import React from 'react'
import styled from 'styled-components'

import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { OptionWorkingGroupApplication } from '@/working-groups/components/SelectWorkingGroupApplication/OptionWorkingGroupApplication'
import { WorkingGroupApplication } from '@/working-groups/types/WorkingGroupApplication'

import { Option, OptionsListComponent } from '../../../common/components/selects'

interface Props {
  allWorkingGroupApplications: WorkingGroupApplication[]
  onChange: (option: WorkingGroupApplication) => void
}

export const OptionsListWorkingGroupApplication = React.memo(({ allWorkingGroupApplications, onChange }: Props) => (
  <OptionsListComponent>
    {allWorkingGroupApplications.length ? (
      allWorkingGroupApplications.map((option) => (
        <Option key={option.id} onClick={() => onChange(option)}>
          <OptionWorkingGroupApplication application={option} />
        </Option>
      ))
    ) : (
      <Option onClick={() => undefined}>
        <NoOptionsInformation>No options</NoOptionsInformation>
      </Option>
    )}
  </OptionsListComponent>
))

const NoOptionsInformation = styled(TextMedium)`
  text-align: center;
  color: ${Colors.Black[500]};
`
