import styled, { css } from 'styled-components'

import { Colors, Fonts } from '../../constants'

interface TextProps {
  bold?: boolean
  normalWeight?: boolean
  italic?: boolean
  underline?: boolean
  lighter?: boolean
  light?: boolean
  dark?: boolean
  black?: boolean
  className?: string
  margin?: 'xs' | 's' | 'm' | 'l' | 'xl' | undefined
  colorInherit?: boolean
  value?: boolean
  inter?: boolean
  error?: boolean
  truncate?: boolean
  truncateLines?: number
}

const TextValueStyle = css`
  font-family: ${Fonts.Grotesk};
`

const TextInterStyle = css`
  font-family: ${Fonts.Inter};
`

const TextBoldStyle = css`
  font-weight: 700;
`

const TextNormalWeightStyle = css`
  font-weight: 400;
`

const TextItalicStyle = css`
  font-style: italic;
`

const TextUnderlineStyle = css`
  text-decoration: underline;
`

const TextDarkStyle = css`
  color: ${Colors.Black[700]};
`

const TextBlackStyle = css`
  color: ${Colors.Black[900]};
`

const TextLighterStyle = css`
  color: ${Colors.Black[400]};
`

const TextLightStyle = css`
  color: ${Colors.Black[600]};
`

const TextErrorStyle = css`
  color: ${Colors.Negative[500]};
`

const TextTruncateStyle = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TextTruncateLines = css<TextProps>`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ truncateLines }) => truncateLines};
`

const TextMargins = css<TextProps>`
  margin-bottom: ${({ margin }) => {
    switch (margin) {
      case 'xs':
        return '4px'
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
  ${({ bold }) => bold && TextBoldStyle};
  ${({ italic }) => italic && TextItalicStyle};
  ${({ underline }) => underline && TextUnderlineStyle};
  ${({ dark }) => dark && TextDarkStyle};
  ${({ black }) => black && TextBlackStyle};
  ${({ lighter }) => lighter && TextLighterStyle};
  ${({ light }) => light && TextLightStyle};
  ${({ value }) => value && TextValueStyle};
  ${({ inter }) => inter && TextInterStyle};
  ${({ normalWeight }) => normalWeight && TextNormalWeightStyle};
  ${({ error }) => error && TextErrorStyle}
  ${({ truncate }) => truncate && TextTruncateStyle};
  ${({ truncateLines }) => truncateLines && TextTruncateLines};
  ${TextMargins};
`

export const TextExtraSmall = styled.p<TextProps>`
  font-size: 10px;
  line-height: 16px;
  ${TextAllStyles}
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
export const TextHuge = styled.p<TextProps>`
  font-size: 20px;
  line-height: 28px;
  ${TextAllStyles}
`
export const TextExtraHuge = styled.p<TextProps>`
  font-size: 24px;
  line-height: 32px;
  ${TextAllStyles}
`
export const TextInlineExtraSmall = styled.span<TextProps>`
  font-size: 10px;
  line-height: 16px;
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
export const TextInlineHuge = styled.span<TextProps>`
  font-size: 20px;
  line-height: 28px;
  ${TextAllStyles}
`
