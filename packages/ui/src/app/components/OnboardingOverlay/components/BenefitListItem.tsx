import React from 'react'
import styled from 'styled-components'

import { BenefitsTableLayout } from '@/app/components/OnboardingOverlay/components/BenefitsTable'
import { CheckboxIcon } from '@/common/components/icons'
import { CrossIcon } from '@/common/components/icons/CrossIcon'
import { TableListItem } from '@/common/components/List'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface Props {
  text: string
}

export const BenefitListItem = ({ text }: Props) => (
  <Item $colLayout={BenefitsTableLayout}>
    <TextMedium>{text}</TextMedium>
    <Circle color={Colors.Black[600]}>
      <CrossIcon />
    </Circle>
    <Circle color={Colors.Green[500]}>
      <CheckboxIcon />
    </Circle>
  </Item>
)

const Item = styled(TableListItem)`
  border: none;
  height: 44px;
  background-color: ${Colors.Black[400]}22;
  border-radius: 0;

  &:not(:last-child) {
    margin-bottom: 5px;
  }

  > *:not(:first-child) {
    text-align: center;
  }

  > *:first-child {
    text-align: right;
    color: ${Colors.Black[300]};
  }
`

const Circle = styled.span<{ color: string }>`
  justify-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 28px;
  width: 28px;
  background-color: ${({ color }) => color};

  svg {
    color: ${Colors.White};
  }
`
