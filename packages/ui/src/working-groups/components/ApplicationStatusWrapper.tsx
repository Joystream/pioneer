import styled from 'styled-components'

import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export const ApplicationStatusWrapper = styled(RowGapBlock)`
  text-align: center;

  & > ${RowGapBlock} > h4 {
    color: ${Colors.Blue[500]};
  }

  ${TextSmall} {
    color: ${Colors.Black[500]};
  }
`
