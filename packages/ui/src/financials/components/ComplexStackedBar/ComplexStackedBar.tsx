import React, { useState } from 'react'
import styled from 'styled-components'

import { Colors } from '@/common/constants'
import { Data, StackedBar, StackedBarProps } from '@/financials/components/StackedBar/StackedBar'

export interface ComplexStackedBarProps extends StackedBarProps {
  details: Record<string, Data>
}

export const ComplexStackedBar = ({ details, ...stackedBarProps }: ComplexStackedBarProps) => {
  const [active, setActive] = useState<number | string | null>(null)

  return (
    <Wrapper>
      <StackedBar {...stackedBarProps} active={active || ''} setActive={setActive} />
      {active && (
        <DetailsWrapper>
          <StackedBar data={details[active]} title={String(active)} barHeight={20} haveHover={false} />
        </DetailsWrapper>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 10px;
  padding: 20px;
  border: 1px solid ${Colors.Black[100]};

  > *:nth-child(1) {
    grid-column: 1/3;
  }

  > *:nth-child(2) {
    grid-column: 1/3;
  }
`

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 11px 24px;
  row-gap: 15px;
  background-color: ${Colors.Black[50]};
  border: 1px solid ${Colors.Black[200]};
`
