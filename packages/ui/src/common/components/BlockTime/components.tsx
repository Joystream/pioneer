import styled from 'styled-components'

import { LabelLink } from '@/common/components/forms'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { Colors, Transitions } from '@/common/constants'

export const AboutText = styled(TextMedium)`
  color: ${Colors.Black[600]};
`
export const BlockInfo = styled.span`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
  height: fit-content;
  color: ${Colors.Black[400]};
`
export const BlockNetworkInfo = styled(TextSmall)`
  color: ${Colors.Black[400]};
`
export const BlockNumber = styled(LabelLink)`
  font-size: inherit;
  line-height: inherit;
  transition: ${Transitions.all};
`
