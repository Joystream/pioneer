import styled, { css } from 'styled-components'

import { BorderRad, Colors, Transitions } from '../../constants'

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  square?: boolean
}

export const Button = styled.button<Props>`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  justify-items: center;
  align-items: center;
  width: fit-content;
  min-width: 48px;
  height: 48px;
  padding: 8px 16px;
  border: 1px solid ${Colors.Blue[500]};
  border-radius: ${BorderRad.s};
  font-size: 16px;
  font-weight: 700;
  text-transform: capitalize;
  color: ${Colors.White};
  background-color: ${Colors.Blue[500]};
  outline: none;
  transition: ${Transitions.all};
  cursor: pointer;

  ${(props) => {
    if (!props.size && props.square) {
      return css`
        padding: 8px;
        max-width: 48px;
      `
    }

    if (props.size == 'medium' && !props.square) {
      return css`
        height: 40px;
        padding: 4px 16px;
        min-width: 40px;
      `
    }

    if (props.size == 'medium' && props.square) {
      return css`
        height: 40px;
        padding: 4px 16px;
        min-width: 40px;
        max-width: 40px;
        padding: 8px;
      `
    }

    if (props.size == 'small' && props.square) {
      return css`
        height: 32px;
        padding: 4px 8px;
        grid-column-gap: 4px;
        min-width: 32px;
        font-size: 14px;
      `
    }

    if (props.size == 'small' && !props.square) {
      return css`
        max-width: 32px;
        padding: 6px;
      `
    }
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
