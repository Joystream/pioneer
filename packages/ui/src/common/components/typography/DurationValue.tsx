import React from 'react'
import styled from 'styled-components'

import { Colors, Fonts } from '@/common/constants'
import { intersperse } from '@/common/utils'

interface DurationValueProps {
  value: [number, string][]
}

export const DurationValue = ({ value }: DurationValueProps) => (
  <>
    {value.length > 0 ? (
      intersperse(
        value
          .flatMap(([amount, unit]) => (amount ? <Period key={unit} amount={amount} unit={unit} /> : []))
          .slice(0, 2),
        (index) => <Separator key={index} />
      )
    ) : (
      <Days>None</Days>
    )}
  </>
)

const Period = ({ amount, unit }: { amount: number; unit: string }) => (
  <Days unit={unit}>
    {amount} <Unit>{unit}</Unit>
  </Days>
)

const Days = styled.div<{ unit?: string }>`
  display: inline-grid;
  position: relative;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: baseline;
  width: fit-content;
  font-weight: 700;
  color: ${Colors.Black[900]};
  font-family: ${Fonts.Grotesk};
  font-size: 20px;
`

const Unit = styled.span`
  display: inline-block;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: ${Colors.Black[400]};
  font-family: ${Fonts.Grotesk};
`

const Separator = styled((props) => <span {...props}>:</span>)`
  display: inline-block;
  margin: 0 8px;
`
