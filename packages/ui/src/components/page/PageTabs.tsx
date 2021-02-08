import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Colors, Transitions } from '../../constants'

export const PageTabs = styled.nav`
  display: grid;
  position: relative;
  grid-auto-flow: column;
  grid-column-gap: 40px;
  width: 100%;
  align-items: center;
  justify-items: start;
  z-index: 1;

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
export const PageTab = styled(Link)`
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
`
export const PageTabActive = styled(PageTab)`
  &:before {
    content: '';
    position: absolute;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: ${Colors.Blue[500]};
    transition: ${Transitions.all};
  }
`
