import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { PageContent } from '../../common/components/page/PageContent'
import { Breadcrumbs } from '../../common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { breadcrumbsOptions } from '../constants/breadcrumbs'

export interface PageLayoutProps {
  lastBreadcrumb?: string
  header?: ReactNode
  main?: ReactNode
  sidebar?: ReactNode
  sidebarScrollable?: boolean
  footer?: ReactNode
}

export const PageLayout = ({ header, main, sidebar, sidebarScrollable, footer, lastBreadcrumb }: PageLayoutProps) => (
  <PageContent>
    <Breadcrumbs lastBreadcrumb={lastBreadcrumb} breadcrumbsOptions={breadcrumbsOptions} />
    <PageLayoutContent
      header={header}
      main={main}
      sidebar={sidebar}
      sidebarScrollable={sidebarScrollable}
      footer={footer}
    />
  </PageContent>
)

export const PageLayoutContent = ({ header, main, sidebar, sidebarScrollable, footer }: PageLayoutProps) => (
  <PageLayoutComponent header={header} main={main} sidebar={sidebar} footer={footer}>
    {header && <PageHeader>{header}</PageHeader>}
    {main && <PageMain>{main}</PageMain>}
    {sidebar && <PageSidebar sidebarScrollable={sidebarScrollable}>{sidebar}</PageSidebar>}
    {footer && <PageFooter>{footer}</PageFooter>}
  </PageLayoutComponent>
)

const PageHeader = styled.header`
  width: 100%;
  grid-area: header;
`

export const PageHeaderWrapper = styled.section`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px 8px;
`

export const PageHeaderRow = styled.div<{ showOverflow?: boolean }>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 24px;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  overflow: ${({ showOverflow }) => (showOverflow ? 'visible' : 'hidden')};
`

const PageMain = styled.main`
  width: 100%;
  grid-area: main;
  height: 100%;
`

const PageSidebar = styled.aside<Pick<PageLayoutProps, 'sidebarScrollable'>>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  grid-area: sidebar;

  ${({ sidebarScrollable }) =>
    sidebarScrollable &&
    css`
      max-height: 100%;
      overflow: hidden;
    `}
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

const PageLayoutWithSidebar = css`
  grid-template-columns: 1fr ${SidebarWidth};
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header header'
    'main sidebar';
`

const PageLayoutWithSidebarAndFooter = css`
  grid-template-columns: 1fr ${SidebarWidth};
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header header'
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
    if (props.main && !props.sidebar && !props.footer) {
      return PageLayoutDefault
    } else if (props.main && props.footer && !props.sidebar) {
      return PageLayoutWithFooter
    } else if (props.main && props.sidebar && !props.footer) {
      return PageLayoutWithSidebar
    } else if (props.main && props.sidebar && props.footer) {
      return PageLayoutWithSidebarAndFooter
    }
  }};
`
