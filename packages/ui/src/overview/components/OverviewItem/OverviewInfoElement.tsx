import React from 'react'
import styled from 'styled-components'

import { TextHuge, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface Props {
  value: React.ReactNode
  label: string
}

export const OverviewInfoElement = ({ value, label }: Props) => {
  return (
    <Wrapper>
      <Value black bold value>
        {value}
      </Value>
      <Label light>{label}</Label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: block;
`

const Value = styled(TextHuge)`
  margin-bottom: 12px;
`

const Label = styled(TextSmall)`
  color: ${Colors.Black[500]};
`
