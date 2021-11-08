import React from 'react'
import styled, { css } from 'styled-components'

import { HintIcon } from '@/common/components/icons/HintIcon'
import { BorderRad, Colors } from '@/common/constants'

import { ButtonGhostStyles, ButtonPrimary, ButtonInnerWrapper, ButtonPrimaryStyles } from './Buttons'

export interface HintIconProps {
  isActive?: boolean
  onClick?: () => void
}

export function HintButton({ isActive, onClick }: HintIconProps) {
  return (
    <HintButtonElement size="small" isActive={isActive} onClick={onClick}>
      <HintIcon />
    </HintButtonElement>
  )
}

export const HintButtonWrapper = styled.div<{ isActive?: boolean }>`
  ${ButtonGhostStyles}, ${ButtonPrimaryStyles} {
    border-radius: 100%;
    color: ${(props) => (props.isActive ? Colors.White : Colors.Grey)};
  }
`

const HintButtonElement = styled(ButtonPrimary)<{ isActive?: boolean }>`
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: ${BorderRad.full};

  ${({ isActive }) =>
    isActive
      ? css`
          border-color: ${Colors.Blue[500]};
          background-color: ${Colors.Blue[500]};
          color: ${Colors.White};

          ${ButtonInnerWrapper} > svg {
            color: ${Colors.White};
          }

          &:before {
            background-color: ${Colors.Blue[400]};
          }

          &:after {
            background-color: ${Colors.Blue[700]};
          }

          &:hover,
          &:focus {
            border-color: ${Colors.Blue[400]};
          }

          &:active {
            border-color: ${Colors.Blue[700]};
          }
        `
      : css`
          color: ${Colors.Black[900]};
          border-color: ${Colors.Black[200]};
          background-color: ${Colors.White};

          ${ButtonInnerWrapper} > svg {
            color: ${Colors.Black[400]};
          }

          &:before {
            background-color: ${Colors.Black[50]};
          }

          &:after {
            background-color: ${Colors.Blue[50]};
          }

          &:hover,
          &:focus {
            border-color: ${Colors.Blue[100]};
            color: ${Colors.Blue[500]};

            ${ButtonInnerWrapper} > svg {
              color: ${Colors.Blue[500]};
            }

            & .blackPart,
            & .primaryPart {
              color: ${Colors.Blue[500]};
              fill: ${Colors.Blue[500]};
            }
          }

          &:active {
            border-color: ${Colors.Blue[100]};
          }
        `};
`
