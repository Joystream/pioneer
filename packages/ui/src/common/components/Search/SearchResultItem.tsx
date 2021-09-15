import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { GhostRouterLink } from '@/common/components/RouterLink'
import { Colors, Transitions } from '@/common/constants'

import { TextMedium } from '../typography'

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
    <ResultLink as={GhostRouterLink} to={to}>
      <ResultTitle>
        <HighlightedText pattern={pattern}>{title}</HighlightedText>
      </ResultTitle>
      <ResultText>
        <HighlightedText pattern={pattern} shorten>
          {children}
        </HighlightedText>
      </ResultText>
    </ResultLink>
  </ResultItemStyle>
)

const ResultTitle = styled.h5`
  margin: 8px 0;
  transition: ${Transitions.all};
`

const ResultItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px ${Colors.Black[200]};
  color: ${Colors.Black[400]};
  overflow-x: hidden;
  padding-bottom: 14px;
  transition: ${Transitions.all};

  &:hover,
  &:focus,
  &:focus-within {
    border-color: ${Colors.Blue[100]};
  }
`

const ResultText = styled(TextMedium)`
  color: ${Colors.Black[500]};
`

const ResultLink = styled.a`
  &:hover,
  &:focus,
  &:focus-within {
    ${ResultTitle} {
      color: ${Colors.Blue[500]};
    }
  }
`
