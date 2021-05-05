import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Colors, Transitions, Fonts } from '../../../../constants'

export interface BreadcrumbsItemProps {
  url: string
  children: ReactNode
}

export const BreadcrumbsItem = React.memo(({ url, children }: BreadcrumbsItemProps) => {
  return (
    <BreadcrumbsItemComponent>
      <BreadcrumbsItemLink to={url}>{children}</BreadcrumbsItemLink>
    </BreadcrumbsItemComponent>
  )
})

const BreadcrumbsItemLink = styled(Link)`
  font-size: 10px;
  line-height: 16px;
  color: ${Colors.Black[500]};
  transition: ${Transitions.all};
  text-decoration: none;
  font-family: ${Fonts.Inter};

  &:hover {
    color: ${Colors.Blue[500]};
  }
`

const BreadcrumbsItemComponent = styled.li`
  display: inline-flex;
  position: relative;
  align-items: center;
  margin-left: 26px;
  color: ${Colors.Black[500]};

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: -16px;
    width: 4px;
    height: 4px;
    border-top: 1px solid ${Colors.Black[300]};
    border-right: 1px solid ${Colors.Black[300]};
    transform: translate(0, -50%) rotate(45deg);
  }

  &:last-child {
    ${BreadcrumbsItemLink} {
      color: ${Colors.Black[400]};
      cursor: auto;
      pointer-events: none;
    }
  }
`
