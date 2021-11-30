import React, { FC } from 'react'
import styled from 'styled-components'

import { BorderRad, Colors, Shadows, Transitions } from '../../constants'
import { Icon } from '../icons'

import { StatiscticBlockProps, StatisticItemContentGrid, StatisticItemProps, StatsContent } from '.'
import { StatisticHeader } from './StatisticHeader'

export interface StatisticButtonProps extends StatisticItemProps {
  onClick: () => void
  disabled?: boolean
  icon?: React.ReactElement
}

export const StatisticButton: FC<StatisticButtonProps> = ({
  className,
  children,
  icon,
  onClick,
  disabled,
  ...headerProps
}) => (
  <StatsButton key={headerProps.title} className={className} onClick={onClick} disabled={disabled}>
    <StatsButtonInnerWrapper>
      <StatisticHeader {...headerProps} />
      <StatsContent>
        <StatisticItemContentGrid>{children}</StatisticItemContentGrid>
      </StatsContent>
      <StatsButtonIcon size={16}>{icon}</StatsButtonIcon>
    </StatsButtonInnerWrapper>
  </StatsButton>
)

const StatsButtonIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateX(0%) translateY(-50%);
  transition: ${Transitions.all};
`

const StatsButtonInnerWrapper = styled.div<StatiscticBlockProps>`
  display: grid;
  position: relative;
  justify-content: start;
  align-content: ${({ centered }) => (centered ? 'stretch' : 'space-between')};
  ${({ centered }) => (centered ? 'align-items: center;' : null)};
  width: 100%;
  height: ${({ size }) => {
    switch (size) {
      case 's':
        return 'auto'
      case 'm':
        return '88px'
      case 'l':
      default:
        return '100px'
    }
  }};
  padding: 12px 32px 20px 16px;
  border-radius: ${BorderRad.m};
  overflow: hidden;

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 150%;
    height: 150%;
    border-radius: ${BorderRad.full};
    transform: translate(-150%, -50%);
    transition: ${Transitions.all};
    z-index: -1;
    pointer-events: none;
  }
  &:before {
    background-color: ${Colors.Black[50]};
  }
  &:after {
    background-color: ${Colors.Blue[50]};
  }

  & .blackPart,
  & .primaryPart {
    transition: ${Transitions.all};
  }
`

export const StatsButton = styled.button`
  display: flex;
  position: relative;
  flex-basis: 240px;
  flex-grow: 1;
  border: 1px solid ${Colors.White};
  border-radius: ${BorderRad.m};
  background-color: ${Colors.White};
  box-shadow: ${Shadows.light};
  outline: none;
  cursor: pointer;
  z-index: 1;
  transition: ${Transitions.all};

  ${StatsButtonIcon} {
    color: ${Colors.Black[600]};
  }

  .blackPart {
    color: ${Colors.Black[900]};
  }
  .primaryPart {
    color: ${Colors.Blue[500]};
  }

  &:hover,
  &:focus {
    border-color: ${Colors.Blue[100]};
    color: ${Colors.Blue[500]};
    ${StatsButtonIcon} {
      color: ${Colors.Blue[500]};
      transform: translateX(4px) translateY(-50%);
    }
    & .blackPart,
    & .primaryPart {
      color: ${Colors.Blue[500]};
      fill: ${Colors.Blue[500]};
    }
    ${StatsButtonInnerWrapper}:before {
      transform: translate(-50%, -50%);
    }
  }
  &:active {
    border-color: ${Colors.Blue[100]};
    color: ${Colors.Blue[600]};
    transform: scale(0.96);
    ${StatsButtonIcon} {
      color: ${Colors.Blue[500]};
      transform: translateX(8px) translateY(-50%);
    }
    & .blackPart,
    & .primaryPart {
      color: ${Colors.Blue[600]};
      fill: ${Colors.Blue[600]};
    }
    ${StatsButtonInnerWrapper}:after {
      transform: translate(-50%, -50%);
    }
  }
  &:disabled {
    cursor: not-allowed;
    color: ${Colors.Black[300]};
    ${StatsButtonIcon} {
      color: ${Colors.Black[300]};
    }
    & .blackPart,
    & .primaryPart {
      color: ${Colors.Black[300]};
      fill: ${Colors.Black[300]};
    }
    color: ${Colors.Black[300]};
    border-color: ${Colors.Black[200]};
    background-color: ${Colors.White};

    &:hover,
    &:focus,
    &:active {
      transform: scale(1);
      ${StatsButtonInnerWrapper} {
        &:after,
        &:before {
          transform: translate(-150%, -50%);
        }
      }
    }
  }
`
