import styled from 'styled-components'

import { TextInlineSmall } from '@/common/components/typography'
import { Fonts, Transitions } from '@/common/constants'

export const FilterLabel = styled(TextInlineSmall).attrs({ bold: true, lighter: true })`
  font-family: ${Fonts.Grotesk};
  font-size: 10px;
  line-height: 16px;
  text-transform: uppercase;
  user-select: none;
  white-space: nowrap;
  cursor: pointer;
  transition: ${Transitions.all};
`
