import styled, { css } from 'styled-components'

import { Colors } from '../../../app/constants'

interface TextProps {
  bold?: boolean
  italic?: boolean
  dark?: boolean
  className?: string
  margin?: 's' | 'm' | 'l' | 'xl' | undefined
  colorInherit?: boolean
}

const TextBoldStyle = css`
  font-weight: 700;
`

const TextItalicStyle = css`
  font-weight: 700;
`

const TextDarkStyle = css`
  color: ${Colors.Black[700]};
`

const TextMargins = css<TextProps>`
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

const TextAllStyles = css<TextProps>`
  ${(props) => {
    if (props.bold === true) {
      return TextBoldStyle
    }
  }};
  ${(props) => {
    if (props.italic === true) {
      return TextItalicStyle
    }
  }};
  ${(props) => {
    if (props.dark === true) {
      return TextDarkStyle
    }
  }};
  ${TextMargins};
`

export const TextSmall = styled.p<TextProps>`
  font-size: 12px;
  line-height: 18px;
  ${TextAllStyles}
`
export const TextMedium = styled.p<TextProps>`
  font-size: 14px;
  line-height: 20px;
  ${TextAllStyles}
`
export const TextBig = styled.p<TextProps>`
  font-size: 16px;
  line-height: 24px;
  ${TextAllStyles}
`
