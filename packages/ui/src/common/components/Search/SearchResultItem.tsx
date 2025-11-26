import React from 'react'
import styled from 'styled-components'

import { GhostRouterLink } from '@/common/components/RouterLink'
import { BreadcrumbsItem, BreadcrumbsItemLink } from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsItem'
import { BreadcrumbsListComponent } from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsList'
import { Colors, Fonts, Transitions } from '@/common/constants'

import { TextMedium } from '../typography'

import { HighlightedText } from './HighlightedText'

interface SearchResultItemProp {
  onClick: () => void
  pattern: RegExp | null
  author: string
  date: string
  to: string
  children: string
}
export const SearchResultItem = ({ pattern, author, date, to, children, onClick }: SearchResultItemProp) => (
  <ResultItemStyle>
    <SearchBreadcrumbs>
      <BreadcrumbsItem url="" isLink={false}>
        {author}
      </BreadcrumbsItem>
      <BreadcrumbsItem url="" isLink={false}>
        {date}
      </BreadcrumbsItem>
    </SearchBreadcrumbs>
    <ResultLink onClick={onClick} as={GhostRouterLink} to={to}>
      <ResultText>
        <HighlightedText pattern={pattern} shorten>
          {children}
        </HighlightedText>
      </ResultText>
    </ResultLink>
  </ResultItemStyle>
)

const ResultItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px ${Colors.Black[200]};
  color: ${Colors.Black[400]};
  overflow-x: hidden;
  padding-bottom: 14px;
  transition: ${Transitions.all};
  min-width: 0;

  &:hover,
  &:focus,
  &:focus-within {
    border-color: ${Colors.Blue[100]};
  }
`

const ResultText = styled(TextMedium)`
  color: ${Colors.Black[500]};
  word-wrap: break-word;
  overflow-wrap: break-word;
  min-width: 0;
`

const ResultLink = styled.a`
  margin-top: 4px;
  min-width: 0;
`

const SearchBreadcrumbs = styled(BreadcrumbsListComponent)`
  ${BreadcrumbsItemLink} {
    &,
    &:visited {
      color: ${Colors.Black[400]};
      font-family: ${Fonts.Grotesk};
    }
  }
`
