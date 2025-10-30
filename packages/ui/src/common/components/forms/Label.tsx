import styled from 'styled-components'

import { Colors } from '../../constants'
import { TooltipContainer } from '../Tooltip'

interface LabelProps {
  noMargin?: boolean
  isRequired?: boolean
  className?: string
}

export const Label = styled.label<LabelProps>`
  display: inline-flex;
  align-items: center;
  align-content: center;
  width: fit-content;
  margin-bottom: ${({ noMargin }) => (noMargin ? '0px' : '4px')};
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  color: ${Colors.Black[900]};
  position: relative;

  &:after {
    ${({ isRequired }) => {
      switch (isRequired) {
        case true:
          return `
            content: '*';
            color: ${Colors.Black[400]};
            font-size: 14px;
            line-height: 14px;
            font-family: inherit;
            margin-left: 4px;
            transform: translateY(2px);
          `
      }
    }};
  }

  ${TooltipContainer} {
    position: relative;
    display: inline;
    transform: unset;
    right: unset;
    margin-left: 4px;
  }
`
