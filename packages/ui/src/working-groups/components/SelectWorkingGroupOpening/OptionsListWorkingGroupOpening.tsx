import React from 'react'
import styled from 'styled-components'

import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import {
  OptionWorkingGroupOpening,
  OptionWorkingGroupTitle,
} from '@/working-groups/components/SelectWorkingGroupOpening/OptionWorkingGroupOpening'
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
        <StyledOption key={option.id} onClick={() => onChange(option)}>
          <OptionWorkingGroupOpening opening={option} />
        </StyledOption>
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

const StyledOption = styled(Option)`
  grid-template-columns: 1fr !important;
  padding: 10px 16px;

  &:hover,
  &:focus,
  &:focus-within {
    ${OptionWorkingGroupTitle} {
      color: ${Colors.Blue[500]};
    }
  }
  &:active {
    ${OptionWorkingGroupTitle} {
      color: ${Colors.Blue[600]};
    }
  }
  &:disabled {
    cursor: not-allowed;
    background-color: ${Colors.Black[50]};
    z-index: 0;

    ${OptionWorkingGroupTitle} {
      color: ${Colors.Black[500]};
    }
    ${TextMedium} {
      color: ${Colors.Black[400]};
    }
  }
`
