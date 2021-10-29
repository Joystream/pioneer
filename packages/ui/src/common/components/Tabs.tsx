import React, { FC } from 'react'
import styled, { css } from 'styled-components'

import { BorderRad, Colors, Transitions } from '../constants'

import { CountBadge } from './CountBadge'

export type PageTabSize = 'xs' | 's'

interface TabActiveProps {
  active: boolean
  disabled?: boolean
}

export interface TabProps extends TabActiveProps {
  onClick: () => void
  title: string
  className?: string
  count?: number
  changes?: boolean
}

export interface TabsSize {
  tabsSize?: PageTabSize
}

export interface TabsProps {
  tabs: Array<TabProps>
  className?: string
  tabsSize?: PageTabSize
}

export const Tabs = ({ tabs, className, tabsSize }: TabsProps) => (
  <TabsContainer className={className} tabsSize={tabsSize}>
    {tabs.map(({ active, onClick, title, count, changes }) => (
      <Tab key={title} active={active} onClick={onClick} title={title} count={count} changes={changes} />
    ))}
  </TabsContainer>
)

export const TabsContainer: FC<Omit<TabsProps, 'tabs'>> = ({ className, tabsSize, children }) => (
  <TabsStyles className={className} tabsSize={tabsSize}>
    <TabsNav tabsSize={tabsSize}>{children}</TabsNav>
  </TabsStyles>
)

const Tab = ({ active, onClick, title, count, changes }: TabProps) => (
  <TabContainer active={active} onClick={onClick}>
    {title} {count !== undefined && <CountBadge count={count} />} {changes && <ChangesIndicator />}
  </TabContainer>
)

const TabsStyles = styled.div<TabsSize>`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  z-index: 2;

  ${({ tabsSize }) => {
    if (tabsSize !== 'xs') {
      return css`
        &:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: calc(100% + 24px);
          height: 1px;
          background-color: ${Colors.Black[200]};
          z-index: -1;
        }
      `
    }
  }}
`

const ChangesIndicator = styled.div`
  width: 6px;
  height: 6px;
  border-radius: ${BorderRad.round};
  background-color: ${Colors.Blue[500]};
`

export const TabContainer = styled.button<TabActiveProps>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  position: relative;
  align-items: center;
  width: fit-content;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: ${({ active }) => (active ? Colors.Black[900] : Colors.Black[500])};
  text-transform: capitalize;
  -webkit-text-stroke-width: ${({ active }) => (active ? '0.05em' : '0em')};
  -webkit-text-stroke-color: ${({ active }) => (active ? Colors.Black[900] : 'transparent')};
  cursor: pointer;
  transition: ${Transitions.all};
  text-decoration: none;

  &:before {
    content: '';
    position: absolute;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: ${Colors.Blue[500]};
    transform: scaleX(0);
    transition: ${Transitions.all};
  }

  &:hover,
  &:focus,
  &:focus-within {
    color: ${Colors.Blue[500]};
    -webkit-text-stroke-color: ${({ active }) => (active ? Colors.Blue[500] : 'transparent')};
  }
  &:active {
    color: ${Colors.Blue[700]};
    -webkit-text-stroke-color: ${({ active }) => (active ? Colors.Blue[700] : 'transparent')};
  }

  ${({ active }) =>
    active &&
    css`
      &:before {
        transform: scaleX(1);
        animation: showTabUnderline ${Transitions.duration};

        @keyframes showTabUnderline {
          from {
            transform: scaleX(0);
            background-color: ${Colors.Blue[500]};
          }
          to {
            transform: scaleX(1);
          }
        }
      }
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      &,
      &:hover,
      &:focus,
      &:focus-within {
        color: ${Colors.Grey};
      }
    `}
`

const TabsNav = styled.nav<TabsSize>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 40px;
  width: fit-content;
  align-items: center;
  justify-items: start;
  z-index: 1;

  ${TabContainer} {
    font-size: ${({ tabsSize }) => {
      switch (tabsSize) {
        case 'xs':
          return '14px'
        case 's':
        default:
          return '16px'
      }
    }};
    line-height: ${({ tabsSize }) => {
      switch (tabsSize) {
        case 'xs':
          return '20px'
        case 's':
        default:
          return '24px'
      }
    }};
  }
`
