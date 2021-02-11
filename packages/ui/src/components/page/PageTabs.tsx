import styled, { css } from 'styled-components'
import { Colors, Transitions } from '../../constants'

export const PageTabs = styled.div`
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

export const PageTabsNav = styled.nav`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 40px;
  width: fit-content;
  align-items: center;
  justify-items: start;
  z-index: 1;
`

interface PageTabProps {
  active?: boolean
}

export const PageTab = styled.a`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  position: relative;
  align-items: center;
  width: fit-content;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: ${Colors.Black[900]};
  text-transform: capitalize;
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

  ${({ active }: PageTabProps) =>
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
