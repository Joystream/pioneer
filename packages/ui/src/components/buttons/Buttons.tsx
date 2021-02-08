import styled from 'styled-components'

import { BorderRad, Colors, Transitions } from '../../constants'

export const ButtonPrimary = styled.button`
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
  line-height: 24px;
  font-weight: 700;
  text-transform: capitalize;
  color: ${Colors.White};
  background-color: ${Colors.Blue[500]};
  outline: none;
  transition: ${Transitions.all};
  cursor: pointer;

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
export const ButtonPrimarySquare = styled(ButtonPrimary)`
  padding: 8px;
  max-width: 48px;
`

export const ButtonPrimaryMedium = styled(ButtonPrimary)`
  height: 40px;
  padding: 4px 16px;
  min-width: 40px;
`

export const ButtonPrimaryMediumSquare = styled(ButtonPrimaryMedium)`
  max-width: 40px;
  padding: 8px;
`

export const ButtonPrimarySmall = styled(ButtonPrimary)`
  height: 32px;
  padding: 4px 8px;
  grid-column-gap: 4px;
  min-width: 32px;
  font-size: 14px;
  line-height: 20px;
`

export const ButtonPrimarySmallSquare = styled(ButtonPrimarySmall)`
  max-width: 32px;
  padding: 6px;
`

export const ButtonSecondary = styled(ButtonPrimary)`
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

export const ButtonSecondarySquare = styled(ButtonSecondary)`
  padding: 8px;
  max-width: 48px;
`

export const ButtonSecondaryMedium = styled(ButtonSecondary)`
  height: 40px;
  padding: 4px 16px;
  min-width: 40px;
`

export const ButtonSecondaryMediumSquare = styled(ButtonSecondaryMedium)`
  max-width: 40px;
  padding: 8px;
`

export const ButtonSecondarySmall = styled(ButtonSecondary)`
  height: 32px;
  padding: 4px 8px;
  grid-column-gap: 4px;
  min-width: 32px;
  font-size: 14px;
  line-height: 20px;
`

export const ButtonSecondarySmallSquare = styled(ButtonSecondarySmall)`
  max-width: 32px;
  padding: 6px;
`

export const ButtonGhost = styled(ButtonPrimary)`
  border-color: ${Colors.Black[200]};
  color: ${Colors.Black[900]};
  background-color: ${Colors.White};

  svg {
    color: ${Colors.Black[400]};
  }

  &:hover {
    border-color: ${Colors.Blue[200]};
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

export const ButtonGhostSquare = styled(ButtonGhost)`
  padding: 8px;
  max-width: 48px;
`

export const ButtonGhostMedium = styled(ButtonGhost)`
  height: 40px;
  padding: 4px 16px;
  min-width: 40px;
`

export const ButtonGhostMediumSquare = styled(ButtonGhostMedium)`
  max-width: 40px;
  padding: 8px;
`

export const ButtonGhostSmall = styled(ButtonGhost)`
  height: 32px;
  padding: 4px 8px;
  grid-column-gap: 4px;
  min-width: 32px;
  font-size: 14px;
  line-height: 20px;
`

export const ButtonGhostSmallSquare = styled(ButtonGhostSmall)`
  max-width: 32px;
  padding: 6px;
`
