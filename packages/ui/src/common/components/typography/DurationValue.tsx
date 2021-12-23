import React from 'react'
import styled from 'styled-components'

import { Colors, Fonts } from '@/common/constants'
import { intersperse } from '@/common/utils'

interface DurationValueProps {
  value: [number | string, string][]
  tiny?: boolean
}

export const DurationValue = ({ value, tiny }: DurationValueProps) => (
  <>
    {value.length > 0 ? (
      intersperse(
        value
          .flatMap(([amount, unit]) => (amount ? <Period key={unit} amount={amount} unit={unit} tiny={tiny} /> : []))
          .slice(0, 2),
        (index) => <Separator key={index} tiny={tiny} />
      )
    ) : (
      <Days>None</Days>
    )}
  </>
)

const Period = ({ amount, unit, tiny }: { amount: number | string; unit: string; tiny?: boolean }) => (
  <Days unit={unit} tiny={tiny}>
    {amount} <Unit tiny={tiny}>{unit}</Unit>
  </Days>
)

const Days = styled.div<{ unit?: string; tiny?: boolean }>`
  display: inline-grid;
  position: relative;
  grid-auto-flow: column;
  grid-column-gap: ${({ tiny }) => (tiny ? '0' : '4px')};
  align-items: baseline;
  width: fit-content;
  color: ${({ tiny }) => (tiny ? `${Colors.Black[400]}` : `${Colors.Black[900]}`)};
  font-size: ${({ tiny }) => (tiny ? '12px' : '20px')};
  font-weight: ${({ tiny }) => (tiny ? '400' : '700')};
  font-family: ${Fonts.Grotesk};
`

const Unit = styled.span<{ tiny?: boolean }>`
  display: inline-block;
  font-size: ${({ tiny }) => (tiny ? '12px' : '20px')};
  line-height: 20px;
  font-weight: 400;
  color: ${Colors.Black[400]};
  font-family: ${Fonts.Grotesk};
`

const Separator = styled((props) => <span {...props}>:</span>)`
  display: inline-block;
  color: ${({ tiny }) => (tiny ? `${Colors.Black[400]}` : `${Colors.Black[900]}`)};
  margin: ${({ tiny }) => (tiny ? '0' : '0 8px')};
`
