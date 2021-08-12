import React, { FC } from 'react'
import styled, { css } from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { TabContainer } from '@/common/components/Tabs'
import { Colors } from '@/common/constants'

interface ItemCountProps {
  count: number
  size?: 's' | 'xs'
}
export const ItemCount: FC<ItemCountProps> = ({ count, children, size = 's' }) => (
  <ItemCountStyles as={size === 'xs' ? 'h6' : 'h5'} size={size}>
    {children} <CountBadge count={count} />
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
