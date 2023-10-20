import BN from 'bn.js'
import React from 'react'
import styled, { css } from 'styled-components'

import { CurrencyName } from '@/app/constants/currency'
import { Skeleton } from '@/common/components/Skeleton'

import { Colors, Fonts } from '../../constants'
import { formatJoyValue } from '../../model/formatters'
import { Tooltip } from '../Tooltip'

interface ValueSizingProps {
  size?: 'xs' | 's' | 'm' | 'l'
}

interface ValueProps extends ValueSizingProps {
  value?: BN | null
  className?: string
  isLoading?: boolean
  mjoy?: boolean
}

export const TokenValue = React.memo(({ className, value, size, isLoading, mjoy }: ValueProps) => {
  if (isLoading) {
    return <Skeleton id="tokenValueSkeleton" variant="rect" height="32px" width="50%" />
  }

  if (!value) {
    return <span>-</span>
  }
  return (
    <Tooltip tooltipText={<JOYSuffix>{formatJoyValue(value)}</JOYSuffix>}>
      {mjoy ? (
        <ValueInMJoys className={className} size={size}>
          {formatJoyValue(value.divn(Math.pow(10, 6)), { precision: 2 })}
        </ValueInMJoys>
      ) : (
        <ValueInJoys className={className} size={size}>
          {formatJoyValue(value, { precision: 2 })}
        </ValueInJoys>
      )}
    </Tooltip>
  )
})

const JOYSuffix = styled.span`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: baseline;
  width: fit-content;
  font-weight: 700;
  font-family: ${Fonts.Grotesk};

  &:after {
    content: '${CurrencyName.integerValue}';
    display: inline-block;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: ${Colors.Black[400]};
  }
`

export const ValueInJoys = styled(JOYSuffix)<ValueSizingProps>`
  color: ${Colors.Black[900]};

  ${({ size }) => {
    switch (size) {
      case 'xs': {
        return css`
          font-size: 14px;
          :after {
            font-size: 14px;
          }
        `
      }
      case 's': {
        return css`
          font-size: 16px;
          :after {
            font-size: 14px;
          }
        `
      }
      case 'm': {
        return css`
          font-size: 18px;
          :after {
            font-size: 14px;
          }
        `
      }
      case 'l': {
        return css`
          font-size: 20px;
          :after {
            font-size: 16px;
          }
        `
      }
      default:
        break
    }
  }}
`
export const ValueInMJoys = styled(ValueInJoys)`
  &:after {
    content: 'M${CurrencyName.integerValue}';
  }
`
