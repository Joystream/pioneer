import React from 'react'
import styled, { css } from 'styled-components'

import { Colors, Transitions } from '../../constants'

interface TabActiveProps {
  active: boolean
}

interface TabProps extends TabActiveProps {
  onClick: () => void
  inner?: string
  className?: string
}

export const Tab = ({ active, onClick, inner }: TabProps) => {
  return (
    <PageTab active={active} onClick={onClick}>
      {inner}
    </PageTab>
  )
}

export interface TabsProps {
  tabs: Array<TabProps>
  className?: string
}

export const Tabs = ({ tabs, className }: TabsProps) => {
  return (
    <PageTabsContainer className={className}>
      <PageTabsNav>
        {tabs.map(({ active, onClick, inner }) => (
          <Tab key={inner} active={active} onClick={onClick} inner={inner} />
        ))}
      </PageTabsNav>
    </PageTabsContainer>
  )
}

export const PageTabsContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  z-index: 2;

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

export const PageTab = styled.a<TabActiveProps>`
  display: inline-grid;
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
  -webkit-text-stroke-width: 0.05em;
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
    background: ${Colors.Blue[500]};
    transform: scaleX(0);
    transition: ${Transitions.all};
    animation: hideTabUnderline ${Transitions.duration};

    @keyframes hideTabUnderline {
      from {
        transform: scaleX(1);
        background: ${Colors.Blue[500]};
      }
      to {
        transform: scaleX(0);
      }
    }
  }

  &:hover {
    color: ${Colors.Blue[500]};
    -webkit-text-stroke-color: ${({ active }) => (active ? Colors.Blue[500] : 'transparent')};
  }

  ${({ active }) =>
    active &&
    css`
      &:before {
        content: '';
        position: absolute;
        bottom: -2px;
        width: 100%;
        height: 2px;
        background: ${Colors.Blue[500]};
        transform: scaleX(1);
        transition: ${Transitions.all};
        animation: showTabUnderline ${Transitions.duration};

        @keyframes showTabUnderline {
          from {
            transform: scaleX(0);
            background: ${Colors.Blue[500]};
          }
          to {
            transform: scaleX(1);
          }
        }
      }
    `}
`

export type PageTabSize = 'xs' | 's'

export interface TabsSize {
  tabsSize?: PageTabSize
}

export const PageTabsNav = styled.nav<TabsSize>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 40px;
  width: fit-content;
  align-items: center;
  justify-items: start;
  z-index: 1;

  ${PageTab} {
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
