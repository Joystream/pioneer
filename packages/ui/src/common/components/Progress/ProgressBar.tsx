import styled from 'styled-components'

import { Colors } from '@/common/constants'

export interface ProgressBarProps {
  start?: number
  end: number
  size?: 'small' | 'big'
}

export const ProgressBar = styled.div<ProgressBarProps>`
  background-color: ${Colors.Black[200]};
  border-radius: 4px;
  height: ${({ size }) => {
    switch (size) {
      case 'big':
        return '20px'
      case 'small':
      default:
        return '4px'
    }
  }};
  overflow: hidden;
  position: relative;
  width: 100%;

  &::after {
    background-color: ${Colors.Blue[500]};
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    left: ${({ start = 0 }) => `${start * 100}%`};
    right: ${({ end }) => `${(1 - end) * 100}%`};
  }
`
