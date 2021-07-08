import React from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { BorderRad, Colors, Transitions } from '../../../constants'

interface NavigationLinkProps extends DisabledNavigationLingkProps {
  children: React.ReactNode
  exact?: boolean
  className?: string
  to: string
}

interface DisabledNavigationLingkProps {
  disabled?: boolean
}

export const NavigationLink = ({ children, exact, className, to, disabled }: NavigationLinkProps) => {
  return (
    <NavigationItemLink
      exact={exact}
      to={to}
      className={className}
      disabled={disabled}
      activeClassName="active-page"
      onClick={(event) => {
        if (disabled === true) {
          event.preventDefault()
        }
      }}
    >
      {children}
    </NavigationItemLink>
  )
}

const NavigationItemLink = styled(NavLink)<DisabledNavigationLingkProps>`
  display: grid;
  position: relative;
  grid-auto-flow: column;
  grid-column-gap: 16px;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0px 12px 0px 24px;
  border-radius: 0 ${BorderRad.s} ${BorderRad.s} 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  -webkit-text-stroke-width: 0.05em;
  -webkit-text-stroke-color: transparent;
  color: ${({ disabled }) => (disabled ? Colors.Black[600] : Colors.Black[200])};
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
    color: ${({ disabled }) => (disabled ? Colors.Black[600] : Colors.Black[400])};
    transition: ${Transitions.all};
  }

  &:hover {
    ${({ disabled }) =>
      disabled
        ? css`
            color: ${Colors.Black[600]};
            &:after {
              background-color: transparent;
            }
            .nav-icon {
              color: ${Colors.Black[600]};
            }
            cursor: not-allowed;
          `
        : css`
            color: ${Colors.White};
            &:after {
              background-color: ${Colors.Blue[700]};
            }
            .nav-icon {
              color: ${Colors.White};
            }
          `};
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
