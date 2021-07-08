import styled from 'styled-components'

import { Colors, Fonts } from '../../constants'

import { TextInlineSmall } from './Text'

export const Subscription = styled(TextInlineSmall)`
  color: ${Colors.Black[500]};
  font-family: ${Fonts.Inter};
  white-space: nowrap;
`
