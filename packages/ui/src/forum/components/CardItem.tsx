import styled from 'styled-components'

import { Colors, BorderRad } from '@/common/constants'

export const CardItem = styled.a`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
  padding: 24px;
  &:hover,
  &:focus,
  &:focus-within {
    h5 {
      color: ${Colors.Blue[500]};
    }
  }
`
