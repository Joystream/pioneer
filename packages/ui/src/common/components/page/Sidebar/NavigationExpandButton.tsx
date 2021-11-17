import React from 'react'
import styled, { css } from 'styled-components'

import { BorderRad, Colors, Transitions, Overflow } from '../../../constants'

interface NavigationExpandButtonProps extends DisabledNavigationLinkProps {
  children: React.ReactNode
  className?: string
  active?: boolean
  onClick?: () => void
}

interface DisabledNavigationLinkProps {
  disabled?: boolean
}

export const NavigationExpandButton = ({
  children,
  className,
  active,
  disabled,
  onClick,
}: NavigationExpandButtonProps) => {
  return (
    <NavigationItemButton className={className} disabled={disabled} onClick={onClick} active={active}>
      <ActivePageIndicator active={active} />
      <NavigationItemLinkChildren>{children}</NavigationItemLinkChildren>
    </NavigationItemButton>
  )
}

const ActivePageIndicator = styled.div<Pick<NavigationExpandButtonProps, 'active'>>`
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
    background-color: ${({ active }) => (active ? Colors.Blue[500] : 'transparent')};
    transition: ${Transitions.all};
  }
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ active }) => (active ? Colors.Black[700] : 'transparent')};
    transition: ${Transitions.all};
    z-index: -1;
  }
`

const NavigationItemLinkChildren = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 16px;
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
`

const NavigationItemButton = styled.button<DisabledNavigationLinkProps & Pick<NavigationExpandButtonProps, 'active'>>`
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
  -webkit-text-stroke-color: ${({ active }) => (active ? Colors.White : 'transparent')};
  color: ${({ disabled, active }) => (disabled ? Colors.Black[600] : active ? Colors.White : Colors.Black[200])};
  text-transform: capitalize;
  text-decoration: none;
  transition: ${Transitions.all};
  cursor: pointer;

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
    color: ${({ disabled, active }) => (disabled ? Colors.Black[600] : active ? Colors.White : Colors.Black[400])};
    transition: ${Transitions.all};
    transform: scaleY(${({ active }) => (active ? '-1' : '1')});
  }

  &:hover {
    ${({ disabled, active }) =>
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
        : active
        ? css`
            color: ${Colors.White};
            &:after {
              background-color: 'transparent';
            }
            .nav-icon {
              color: ${Colors.White};
            }
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
  &:disabled {
    cursor: not-allowed;
  }

  @media (max-height: 768px) {
    height: 38px;
  }
`
