import styled, { css } from 'styled-components'

import { Colors, Fonts } from '../../constants'

interface TextProps {
  bold?: boolean
  italic?: boolean
  lighter?: boolean
  light?: boolean
  dark?: boolean
  className?: string
  margin?: 's' | 'm' | 'l' | 'xl' | undefined
  colorInherit?: boolean
  value?: boolean
}

const TextValueStyle = css`
  font-family: ${Fonts.Grotesk};
`

const TextBoldStyle = css`
  font-weight: 700;
`

const TextItalicStyle = css`
  font-weight: 700;
`

const TextDarkStyle = css`
  color: ${Colors.Black[700]};
`

const TextLighterStyle = css`
  color: ${Colors.Black[400]};
`

const TextLightStyle = css`
  color: ${Colors.Black[500]};
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
  ${(props) => {
    if (props.lighter === true) {
      return TextLighterStyle
    }
  }};
  ${(props) => {
    if (props.light === true) {
      return TextLightStyle
    }
  }};
  ${(props) => {
    if (props.value === true) {
      return TextValueStyle
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
export const TextInlineSmall = styled.span<TextProps>`
  font-size: 12px;
  line-height: 18px;
  ${TextAllStyles}
`
export const TextInlineMedium = styled.span<TextProps>`
  font-size: 14px;
  line-height: 20px;
  ${TextAllStyles}
`
export const TextInlineBig = styled.span<TextProps>`
  font-size: 16px;
  line-height: 24px;
  ${TextAllStyles}
`
