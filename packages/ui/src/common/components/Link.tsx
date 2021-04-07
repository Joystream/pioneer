import styled from 'styled-components'

import { Colors, Transitions } from '../../app/constants'

export const Link = styled.a`
  color: ${Colors.Blue[400]};
  text-decoration: underline;
  text-underline-offset: 1px;
  transition: ${Transitions.all};
  cursor: pointer;

  &:hover,
  &:focus {
    color: ${Colors.Blue[500]};
  }
  &:active {
    color: ${Colors.Blue[600]};
  }
`
