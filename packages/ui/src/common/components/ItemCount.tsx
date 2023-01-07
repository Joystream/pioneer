import React, { FC } from 'react'
import styled, { css } from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { TabContainer } from '@/common/components/Tabs'
import { Colors } from '@/common/constants'
import { isDefined } from '@/common/utils'

interface ItemCountProps {
  count?: number
  size?: 's' | 'xs'
  className?: string
}
export const ItemCount: FC<ItemCountProps> = ({ count, children, size = 's', className }) => (
  <ItemCountStyles as={size === 'xs' ? 'h6' : 'h5'} size={size} className={className}>
    {children}
    {isDefined(count) && (
      <>
        {' '}
        <CountBadge count={count} />
      </>
    )}
  </ItemCountStyles>
)

const ItemCountStyles = styled(TabContainer).attrs({ active: true })<Pick<ItemCountProps, 'size'>>`
  cursor: unset;

  ${({ size }) =>
    size === 'xs' &&
    css`
      font-size: 14px;
      line-height: 20px;
    `}

  &:hover,
&:focus,
&:focus-within {
    color: ${Colors.Black[900]};
    -webkit-text-stroke-color: unset;
  }
  &::before {
    display: none;
  }
`
