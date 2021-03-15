import styled, { css } from 'styled-components'

import { BorderRad, Colors, Transitions } from '../../constants'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'small' | 'medium' | 'large'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  square?: boolean
}

const height: { [key in ButtonSize]: string } = {
  large: '48px',
  medium: '40px',
  small: '32px',
}

const getHeight = (props: Props) => height[props.size || 'large']
const getFontSize = (props: Props) => (props.size === 'small' ? '14px' : '16px')
const getPadding = (props: Props) => {
  if (props.size == 'small') {
    return props.square ? '6px' : '4px 8px'
  }

  if (props.size == 'medium') {
    return props.square ? '8px' : '4px 16px'
  }

  return props.square ? '8px' : '8px 16px'
}

export const Button = styled.button<Props>`
  display: inline-grid;
  grid-auto-flow: column;

  justify-items: center;
  align-items: center;
  width: fit-content;
  border: 1px solid ${Colors.Blue[500]};
  border-radius: ${BorderRad.s};
  font-weight: 700;
  text-transform: capitalize;
  color: ${Colors.White};
  background-color: ${Colors.Blue[500]};
  outline: none;
  transition: ${Transitions.all};
  cursor: pointer;

  min-width: ${getHeight};
  height: ${getHeight};
  font-size: ${getFontSize};
  grid-column-gap: ${({ size }) => (size == 'small' ? '4px' : '8px')};
  padding: ${getPadding};

  ${(props) => {
    if (props.square)
      return css`
        max-width: ${getHeight(props)};
      `
  }}

  ${(props) => {
    if (props.variant == 'primary') {
      return css`
        &:hover {
          border-color: ${Colors.Blue[600]};
          background-color: ${Colors.Blue[600]};
        }

        &:focus,
        &:active {
          border-color: ${Colors.Blue[700]};
          background-color: ${Colors.Blue[700]};
        }

        &:disabled {
          border-color: ${Colors.Blue[100]};
          background-color: ${Colors.Blue[100]};
          cursor: not-allowed;
        }
      `
    }

    if (props.variant == 'ghost') {
      return css`
        border-color: ${Colors.Black[200]};
        color: ${Colors.Black[900]};
        background-color: ${Colors.White};

        svg {
          color: ${Colors.Black[400]};
        }

        &:hover {
          border-color: ${Colors.Blue[300]};
          background-color: ${Colors.White};
        }

        &:focus,
        &:active {
          border-color: ${Colors.Blue[300]};
          background-color: ${Colors.White};
          color: ${Colors.Blue[500]};

          svg {
            color: ${Colors.Blue[400]};
          }
        }

        &:disabled {
          color: ${Colors.Black[300]};
          border-color: ${Colors.Black[100]};
          background-color: ${Colors.White};

          svg {
            color: ${Colors.Black[300]};
          }
        }
      `
    }

    if (props.variant == 'secondary') {
      return css`
        border-color: ${Colors.Black[75]};
        color: ${Colors.Black[900]};
        background-color: ${Colors.Black[75]};

        svg {
          color: ${Colors.Black[400]};
        }

        &:hover {
          border-color: ${Colors.Black[100]};
          background-color: ${Colors.Black[100]};
        }

        &:focus,
        &:active {
          border-color: ${Colors.Black[100]};
          background-color: ${Colors.Black[100]};
          color: ${Colors.Blue[500]};

          svg {
            color: ${Colors.Blue[400]};
          }
        }

        &:disabled {
          color: ${Colors.Black[300]};
          border-color: ${Colors.Black[50]};
          background-color: ${Colors.Black[50]};

          svg {
            color: ${Colors.Black[300]};
          }
        }
      `
    }
  }}
`

export const ButtonsGroup = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
`
