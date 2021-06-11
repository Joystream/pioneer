import styled from 'styled-components'

import { TextInlineSmall } from '@/common/components/typography'
import { Colors, Fonts, Transitions } from '@/common/constants'

export const FilterLabel = styled(TextInlineSmall).attrs({ bold: true, lighter: true })`
  cursor: pointer;
  font-family: ${Fonts.Grotesk};
  font-size: 10px;
  line-height: 16px;
  text-transform: uppercase;
  white-space: nowrap;
  user-select: none;
  transition: ${Transitions.all};

  &:hover,
  &:focus-within {
    color: ${Colors.Blue[500]};
  }
`
