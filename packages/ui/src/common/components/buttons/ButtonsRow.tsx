import styled from 'styled-components'

import { spacing } from '@/common/utils/styles'

export const ButtonsRow = styled.div<{ gap?: number }>`
  display: flex;
  align-items: center;
  gap: ${({ gap = 1 }) => spacing(gap)};
`
