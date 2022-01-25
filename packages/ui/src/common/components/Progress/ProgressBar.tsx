import styled from 'styled-components'

import { Colors } from '@/common/constants'

export interface ProgressBarProps {
  start?: number
  end: number
  size?: 'small' | 'big' | 'medium'
  color?: string
  backgroundColor?: string
}

export const ProgressBar = styled.div<ProgressBarProps>`
  background-color: ${({ backgroundColor = Colors.Black[200] }) => `${backgroundColor}`};
  border-radius: 4px;
  height: ${({ size }) => {
    switch (size) {
      case 'big':
        return '20px'
      case 'medium':
        return '10px'
      case 'small':
      default:
        return '4px'
    }
  }};
  overflow: hidden;
  position: relative;
  width: 100%;

  &::after {
    transition: right 0.4s ease-in-out;
    background-color: ${({ color = Colors.Blue[500] }) => `${color}`};
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    left: ${({ start = 0 }) => `${start * 100}%`};
    right: ${({ end }) => `${(1 - end) * 100}%`};
  }
`
