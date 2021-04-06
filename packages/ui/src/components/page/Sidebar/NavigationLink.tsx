import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { BorderRad, Colors, Transitions } from '../../../constants'

interface NavigationLinkProps {
  children: React.ReactNode
  exact?: boolean
  className?: string
  to: string
}

export const NavigationLink = ({ children, exact, className, to }: NavigationLinkProps) => {
  return (
    <NavigationItemLink exact={exact} to={to} className={className} activeClassName="active-page">
      {children}
    </NavigationItemLink>
  )
}

const NavigationItemLink = styled(NavLink)`
  display: grid;
  position: relative;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 12px 12px 12px 24px;
  border-radius: 0 ${BorderRad.s} ${BorderRad.s} 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  -webkit-text-stroke-width: 0.05em;
  -webkit-text-stroke-color: transparent;
  color: ${Colors.Black[200]};
  text-transform: capitalize;
  text-decoration: none;
  overflow: hidden;
  transition: ${Transitions.all};

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: transparent;
    transition: ${Transitions.all};
  }
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    opacity: 0.16;
    transition: ${Transitions.all};
    z-index: -1;
  }

  .nav-icon {
    color: ${Colors.Black[300]};
    transition: ${Transitions.all};
  }

  &:hover {
    color: ${Colors.White};
    &:after {
      background-color: ${Colors.Blue[700]};
    }
    .nav-icon {
      color: ${Colors.Blue[500]};
    }
  }

  &.active-page {
    color: ${Colors.White};
    background-color: ${Colors.Black[700]};
    -webkit-text-stroke-color: ${Colors.White};

    &:before {
      background-color: ${Colors.Blue[500]};
    }
  }
  &.active-page .nav-icon {
    color: ${Colors.White};
  }
`
