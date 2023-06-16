import { motion } from 'framer-motion'
import React from 'react'
import { useLocation } from 'react-router'
import { NavLink, useRouteMatch } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { BorderRad, Colors, Overflow, Transitions } from '../../../constants'

interface NavigationLinkProps extends DisabledNavigationLinkProps {
  icon?: React.ReactElement
  children: React.ReactNode
  indicate?: boolean
  exact?: boolean
  className?: string
  to: string
  onClick?: () => void
}

interface DisabledNavigationLinkProps {
  disabled?: boolean
}

export const NavigationLink = ({
  icon,
  children,
  indicate,
  exact,
  className,
  to,
  disabled,
  onClick,
}: NavigationLinkProps) => {
  const location = useLocation()
  const match = useRouteMatch(to ?? location.pathname)
  const isExternal = to.includes('http')
  const Component = (isExternal ? NavigationItemAnchor : NavigationItemLink) as React.ElementType

  return (
    <Component
      exact={exact}
      to={to}
      href={to}
      target={isExternal ? '_blank' : undefined}
      className={className}
      disabled={disabled}
      activeClassName="active-page"
      onClick={(event: Event) => {
        onClick?.()
        if (disabled) {
          event.preventDefault()
        }
      }}
    >
      {match && (
        <ActivePageIndicator
          layoutId="activeLink"
          className="activeLink"
          initial={false}
          transition={{ default: { duration: 0.25 } }}
        />
      )}
      <NavigationItemLinkChildren>
        {icon}
        {children}
        {indicate && <NavigationItemLinkIndicator />}
      </NavigationItemLinkChildren>
    </Component>
  )
}

const ActivePageIndicator = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: ${Colors.Blue[500]};
    transition: ${Transitions.all};
  }
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: ${Colors.Black[700]};
    transition: ${Transitions.all};
    z-index: -1;
  }
`

export const NAVIGATION_LINK_GAP = 16

const NavigationItemLinkChildren = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${NAVIGATION_LINK_GAP}px;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  -webkit-text-stroke-width: inherit;
  -webkit-text-stroke-color: inherit;
  color: inherit;
  z-index: 20;
  ${Overflow.FullDots};

  svg {
    width: 16px;
    height: 16px;

    path {
      fill: ${Colors.Black[400]}!important;
      transition: ${Transitions.all};
    }
  }

  &:hover {
    svg {
      path {
        fill: ${Colors.White}!important;
      }
    }
  }
`

const NavigationItemLinkIndicator = styled.div`
  position: relative;
  width: 6px;
  height: 6px;
  margin-left: -${NAVIGATION_LINK_GAP - 2}px;
  border-radius: ${BorderRad.round};
  background-color: ${Colors.Green[400]};
  transform: translateY(-6px);
`

const NavigationItemLinkStyles = css<DisabledNavigationLinkProps>`
  display: flex;
  position: relative;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 12px 0 24px;
  border-radius: 0 ${BorderRad.s} ${BorderRad.s} 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  -webkit-text-stroke-width: 0.05em;
  -webkit-text-stroke-color: transparent;
  color: ${({ disabled }) => (disabled ? Colors.Black[600] : Colors.Black[200])};
  text-transform: capitalize;
  text-decoration: none;
  transition: ${Transitions.all};

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
    -webkit-text-stroke-color: ${Colors.White};

    &:hover {
      &:after {
        background-color: transparent;
      }
    }
  }
  &.active-page .nav-icon {
    color: ${Colors.White};
  }

  @media (max-height: 768px) {
    height: 38px;
  }
`

const NavigationItemLink = styled(NavLink)<DisabledNavigationLinkProps>`
  ${NavigationItemLinkStyles}
`

const NavigationItemAnchor = styled.a<DisabledNavigationLinkProps>`
  ${NavigationItemLinkStyles}
`
