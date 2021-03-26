import styled from 'styled-components'
import { Colors } from '../../constants'

interface TextProps {
  size?: number
  bold?: boolean
  italic?: boolean
  dark?: boolean
  className?: string
  margin?: 's' | 'm' | 'l' | 'xl' | undefined
}

export const Text = styled.p<TextProps>`
  font-size: ${(props) => (props.size === 1 ? '16px' : props.size === 2 ? '14px' : props.size === 3 ? '12px' : '16px')};
  line-height: ${(props) =>
    props.size === 1 ? '24px' : props.size === 2 ? '20px' : props.size === 3 ? '18px' : '24px'};
  font-weight: ${(props) => (props.bold ? '700' : '400')};
  font-style: ${(props) => (props.italic ? 'italic' : 'normal')};
  color: ${(props) => (props.dark === true ? Colors.Black[700] : Colors.Black[500])};
  margin-bottom: ${({ margin }) => {
    switch (margin) {
      case 's':
        return '8px'
      case 'm':
        return '16px'
      case 'l':
        return '24px'
      case 'xl':
        return '32px'
      case undefined:
      default:
        return '0px'
    }
  }};
`
