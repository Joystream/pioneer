import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

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

const truncatedBreadcrumbText = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`

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
  ${truncatedBreadcrumbText}
`

export const BreadcrumbsItemText = styled.span`
  color: ${Colors.Black[400]};
  font-size: 10px;
  line-height: 16px;
  font-family: ${Fonts.Inter};
  cursor: auto;
  transition: ${Transitions.all};
  ${truncatedBreadcrumbText}
`

export const BreadcrumbsItemComponent = styled.li`
  display: inline-flex;
  position: relative;
  align-items: center;
  padding-left: 26px;
  min-width: 26px;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 10px;
    width: 4px;
    height: 4px;
    border-top: 1px solid ${Colors.Black[300]};
    border-right: 1px solid ${Colors.Black[300]};
    transform: translate(0, -50%) rotate(45deg);
  }
`
