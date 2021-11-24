import React from 'react'
import styled from 'styled-components'

import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { OptionWorkingGroupOpening } from '@/working-groups/components/SelectWorkingGroupOpening/OptionWorkingGroupOpening'
import { WorkingGroupOpening } from '@/working-groups/types'

import { Option, OptionsListComponent } from '../../../common/components/selects'

interface Props {
  allOpenings: WorkingGroupOpening[]
  onChange: (option: WorkingGroupOpening) => void
}

export const OptionsListWorkingGroupOpening = React.memo(({ allOpenings, onChange }: Props) => (
  <OptionsListComponent>
    {allOpenings.length ? (
      allOpenings.map((option) => (
        <Option key={option.id} onClick={() => onChange(option)}>
          <OptionWorkingGroupOpening opening={option} />
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
