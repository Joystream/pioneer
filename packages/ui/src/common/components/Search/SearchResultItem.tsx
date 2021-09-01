import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { GhostRouterLink } from '@/common/components/RouterLink'
import { Colors } from '@/common/constants'

import { HighlightedText } from './HighlightedText'

interface SearchResultItemProp {
  pattern: RegExp | null
  breadcrumbs: ReactNode
  to: string
  title: string
  children: string
}
export const SearchResultItem = ({ pattern, breadcrumbs, to, title, children }: SearchResultItemProp) => (
  <ResultItemStyle>
    {breadcrumbs}
    <GhostRouterLink to={to}>
      <h5>
        <HighlightedText pattern={pattern}>{title}</HighlightedText>
      </h5>
      <p>
        <HighlightedText pattern={pattern}>{children}</HighlightedText>
      </p>
    </GhostRouterLink>
  </ResultItemStyle>
)

const ResultItemStyle = styled.div`
  border-bottom: solid 1px ${Colors.Black[200]};
  color: ${Colors.Black[400]};
  padding-bottom: 14px;

  h5 {
    font-size: 24px;
    padding: 8px 0;
  }
  p {
    font-size: 16px;
  }
`
