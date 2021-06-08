import styled from 'styled-components'

import { Colors } from '@/common/constants'
import { spacing } from '@/common/utils/styles'

export const ApplicationStatusWrapper = styled.div`
  text-align: center;

  h4 {
    color: ${Colors.Blue[500]};
    margin: ${spacing(2, 0)};
  }

  p {
    color: ${Colors.Black[500]};
    margin-bottom: ${spacing(2)};
  }

  button {
    display: inline-flex;
  }
`
