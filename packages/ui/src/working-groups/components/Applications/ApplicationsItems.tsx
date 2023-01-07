import styled from 'styled-components'

import { Subscription } from '@/common/components/typography/Subscription'
import { Overflow } from '@/common/constants'

import { ToggleableItemInfo, ToggleableItemWrap } from '../ToggleableItemStyledComponents'

export const ApplicationItemWrap = styled(ToggleableItemWrap)`
  grid-template-columns: 1fr 1fr auto;
`

export const ApplicationItemInfo = styled(ToggleableItemInfo)`
  display: grid;
  grid-template-rows: 26px 24px;
  grid-row-gap: 4px;
  width: 100%;
  max-width: 364px;
  align-items: center;
`

export const ApplicationID = styled(Subscription)`
  max-width: 64px;
  ${Overflow.Dots};
`
