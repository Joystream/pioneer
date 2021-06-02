import styled from 'styled-components'

import { TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export const FilterLabel = styled(TextSmall).attrs({ bold: true, lighter: true })`
  color: ${Colors.Grey};
  text-transform: uppercase;
  white-space: nowrap;
`
