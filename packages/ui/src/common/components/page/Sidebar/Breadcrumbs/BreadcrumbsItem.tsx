import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Colors, Transitions, Fonts } from '../../../../constants'

export interface BreadcrumbsItemProps {
  url: string
  children: ReactNode
  isLink?: boolean
}

export const BreadcrumbsItem = React.memo(({ url, children, isLink }: BreadcrumbsItemProps) => {
  return (
    <BreadcrumbsItemComponent>
      {isLink ? (
        <BreadcrumbsItemLink to={url}>{children}</BreadcrumbsItemLink>
      ) : (
        <BreadcrumbsItemText>{children}</BreadcrumbsItemText>
      )}
    </BreadcrumbsItemComponent>
  )
})

export const BreadcrumbsItemLink = styled(Link)`
  &,
  &:visited {
    color: ${Colors.Black[500]};
    font-size: 10px;
    line-height: 16px;
    font-family: ${Fonts.Inter};
    text-decoration: none;
    cursor: pointer;
    transition: ${Transitions.all};
    &:hover,
    &:focus,
    &:focus-visible {
      color: ${Colors.Blue[500]};
    }
  }
`

const BreadcrumbsItemText = styled.span`
  color: ${Colors.Black[400]};
  font-size: 10px;
  line-height: 16px;
  font-family: ${Fonts.Inter};
  cursor: auto;
  transition: ${Transitions.all};
`

const BreadcrumbsItemComponent = styled.li`
  display: inline-flex;
  position: relative;
  align-items: center;
  margin-left: 26px;

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
`
