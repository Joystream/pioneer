import styled from 'styled-components'

import { TextSmall } from '@/common/components/typography'
import { Fonts } from '@/common/constants'

export const FilterLabel = styled(TextSmall).attrs({ bold: true, lighter: true })`
  cursor: pointer;
  font-family: ${Fonts.Grotesk};
  font-size: 10px;
  line-height: 16px;
  text-transform: uppercase;
  user-select: none;
  white-space: nowrap;
`
