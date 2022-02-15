import { BarDatum, BarSvgProps, ComputedDatum, ResponsiveBar } from '@nivo/bar'
import React from 'react'
import styled from 'styled-components'

import { chartCommonProps } from '@/financials/types/constants'

interface Props extends Omit<BarSvgProps<BarDatum>, 'height' | 'width' | 'data'> {
  data: BarDatum
  keys: string[]
  height: number
  onBarClick?: (
    datum: ComputedDatum<BarDatum> & { color: string },
    event: React.MouseEvent<SVGRectElement, MouseEvent>
  ) => void
}

export const HorizontalStackedBar = ({ height, data, keys, onBarClick, ...props }: Props) => {
  return (
    <Wrapper height={height}>
      <ResponsiveBar
        innerPadding={1}
        {...chartCommonProps}
        layout="horizontal"
        data={[data]}
        keys={keys}
        onClick={onBarClick}
        {...props}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => `${height}px`};

  rect {
    cursor: pointer;
  }
`
