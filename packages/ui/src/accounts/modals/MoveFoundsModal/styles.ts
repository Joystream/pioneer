import styled from 'styled-components'

import { BorderRad, Colors, Sizes } from '@/common/constants'
import { spacing } from '@/common/utils/styles'

export const MemberRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  width: 100%;
  min-height: ${Sizes.accountHeight};
  max-height: ${Sizes.accountHeight};
  padding: ${spacing(1, 2)};
  border: 1px solid ${Colors.Black[300]};
  border-bottom: 0;
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};

  &:last-child {
    border-bottom: 1px solid ${Colors.Black[300]};
  }
`

export const ModalBody = styled.div`
  padding: 24px 24px 24px;
  border-top: 1px solid ${Colors.Black[200]};
  border-bottom: 1px solid ${Colors.Black[200]};
`
