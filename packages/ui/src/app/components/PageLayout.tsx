import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { PageContent } from '../../common/components/page/PageContent'
import { Breadcrumbs } from '../../common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { breadcrumbsOptions } from '../constants/breadcrumbs'

export interface PageLayoutProps {
  lastBreadcrumb?: string
  header?: ReactNode
  main?: ReactNode
  lowSidebar?: ReactNode
  highSidebar?: ReactNode
  footer?: ReactNode
}

export const PageLayout = ({
  header,
  main: content,
  lowSidebar,
  highSidebar,
  footer,
  lastBreadcrumb,
}: PageLayoutProps) => (
  <PageContent>
    <Breadcrumbs lastBreadcrumb={lastBreadcrumb} breadcrumbsOptions={breadcrumbsOptions} />
    <PageLayoutComponent
      header={header}
      main={content}
      lowSidebar={lowSidebar}
      highSidebar={highSidebar}
      footer={footer}
    >
      {header}
      {content}
      {lowSidebar}
      {highSidebar}
      {footer}
    </PageLayoutComponent>
  </PageContent>
)

const SidebarWidth = '280px'

const PageLayoutDefault = css`
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header'
    'content';
`

const PageLayoutWithFooter = css`
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'content'
    'footer';
`

const PageLayoutWithLowSidebar = css`
  grid-template-columns: 1fr ${SidebarWidth};
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header header'
    'content sidebar';
`

const PageLayoutWithLowSidebarAndFooter = css`
  grid-template-columns: 1fr ${SidebarWidth};
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header header'
    'content sidebar'
    'footer sidebar';
`

const PageLayoutWithHighSidebar = css`
  grid-template-columns: 1fr ${SidebarWidth};
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header sidebar'
    'content sidebar';
`

const PageLayoutWithHighSidebarAndFooter = css`
  grid-template-columns: 1fr ${SidebarWidth};
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header sidebar'
    'content sidebar'
    'footer sidebar';
`

export const PageLayoutComponent = styled.div<PageLayoutProps>`
  display: grid;
  position: relative;
  align-items: start;
  grid-row-gap: 24px;
  width: 100%;
  ${(props) => {
    if (props.main && !props.lowSidebar && !props.highSidebar && !props.footer) {
      return PageLayoutDefault
    } else if (props.main && props.footer && !props.lowSidebar && !props.highSidebar) {
      return PageLayoutWithFooter
    } else if (props.main && props.lowSidebar && !props.highSidebar && !props.footer) {
      return PageLayoutWithLowSidebar
    } else if (props.main && props.lowSidebar && props.footer && !props.highSidebar) {
      return PageLayoutWithLowSidebarAndFooter
    } else if (props.main && props.highSidebar && !props.lowSidebar && !props.footer) {
      return PageLayoutWithHighSidebar
    } else if (props.main && props.highSidebar && props.footer && !props.lowSidebar) {
      return PageLayoutWithHighSidebarAndFooter
    }
  }};
`
