import styled from 'styled-components'
import { Colors } from '../../constants'

interface TextProps {
  size?: number
  bold?: boolean
  italic?: boolean
  dark?: boolean
}

export const Text = styled.p<TextProps>`
  font-size: ${(props) => (props.size === 1 ? '16px' : props.size === 2 ? '14px' : props.size === 3 ? '12px' : '16px')};
  line-height: ${(props) =>
    props.size === 1 ? '24px' : props.size === 2 ? '20px' : props.size === 3 ? '18px' : '24px'};
  font-weight: ${(props) => (props.bold ? '700' : '400')};
  font-style: ${(props) => (props.italic ? 'italic' : 'normal')};
  color: ${(props) => (props.dark === true ? Colors.Black[900] : Colors.Black[500])};
`
