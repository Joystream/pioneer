import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { CloseButton } from '@/common/components/buttons'
import { TextInlineMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export const StyledTriangle = styled.div<{ deadlineTime?: '1day' | '3day' | undefined }>`
  line-height: 1.5em;
  width: 0;
  height: 0;
  border-bottom: 15px solid transparent;
  border-left: 15px solid
    ${({ deadlineTime }) => {
      switch (deadlineTime) {
        case '1day':
          return Colors.Red[500]
        case '3day':
          return Colors.Orange[300]
        default:
          return Colors.Green[300]
      }
    }};
  border-bottom: 15px solid transparent;
`

export const TimeWrapper = styled.div`
  display: flex;
`

export const StyledText = styled(TextInlineMedium)`
  color: ${Colors.Black[500]};
`
export const ContentWrapper = styled.div`
  margin: 0 0 8px 16px;
`

export const StyledBadge = styled(BadgeStatus)`
  line-height: 18px;
  background-color: ${Colors.Blue[50]};
  color: ${Colors.Blue[500]};
  margin-left: 13px;
`

export const ElementWrapper = styled.div`
  margin: 8px 0 8px 0;
`

export const StyledLink = styled.a`
  text-decoration: underline;
  font-size: 14px;
  color: ${Colors.Black[500]};
  font-style: italic;
`

export const TopElementsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const StyledClosedButton = styled(CloseButton)`
  margin: 5px 5px 0 0;
`
