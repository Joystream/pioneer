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

export const PageLayout = ({ header, main, lowSidebar, highSidebar, footer, lastBreadcrumb }: PageLayoutProps) => (
  <PageContent>
    <Breadcrumbs lastBreadcrumb={lastBreadcrumb} breadcrumbsOptions={breadcrumbsOptions} />
    <PageLayoutComponent header={header} main={main} lowSidebar={lowSidebar} highSidebar={highSidebar} footer={footer}>
      {header && <PageHeader>{header}</PageHeader>}
      {main && <PageMain>{main}</PageMain>}
      {lowSidebar && <PageSidebar>{lowSidebar}</PageSidebar>}
      {highSidebar && <PageSidebar>{highSidebar}</PageSidebar>}
      {footer && <PageFooter>{footer}</PageFooter>}
    </PageLayoutComponent>
  </PageContent>
)

const PageHeader = styled.header`
  width: 100%;
  grid-area: header;
`

const PageMain = styled.main`
  width: 100%;
  grid-area: main;
`

const PageSidebar = styled.aside`
  position: relative;
  width: 100%;
  grid-area: sidebar;
`

const PageFooter = styled.footer`
  width: 100%;
  grid-area: footer;
`

const SidebarWidth = '280px'

const PageLayoutDefault = css`
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header'
    'main';
`

const PageLayoutWithFooter = css`
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'main'
    'footer';
`

const PageLayoutWithLowSidebar = css`
  grid-template-columns: 1fr ${SidebarWidth};
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header header'
    'main sidebar';
`

const PageLayoutWithLowSidebarAndFooter = css`
  grid-template-columns: 1fr ${SidebarWidth};
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header header'
    'main sidebar'
    'footer sidebar';
`

const PageLayoutWithHighSidebar = css`
  grid-template-columns: 1fr ${SidebarWidth};
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header sidebar'
    'main sidebar';
`

const PageLayoutWithHighSidebarAndFooter = css`
  grid-template-columns: 1fr ${SidebarWidth};
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header sidebar'
    'main sidebar'
    'footer sidebar';
`

export const PageLayoutComponent = styled.div<PageLayoutProps>`
  display: grid;
  position: relative;
  align-items: start;
  grid-row-gap: 24px;
  width: 100%;
  min-height: 100%;
  ${(props) =>
    !props.footer &&
    css`
      padding-bottom: 16px;
    `};
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
