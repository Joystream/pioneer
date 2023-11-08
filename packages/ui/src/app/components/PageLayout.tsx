import React, { ReactNode } from 'react'
import styled, { FlattenSimpleInterpolation, css } from 'styled-components'

import { ButtonsGroup } from '../../common/components/buttons'
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
  responsiveStyle?: FlattenSimpleInterpolation
}

export const PageLayout = ({
  header,
  main,
  sidebar,
  sidebarScrollable,
  footer,
  lastBreadcrumb,
  responsiveStyle,
}: PageLayoutProps) => (
  <PageContent>
    <Breadcrumbs lastBreadcrumb={lastBreadcrumb} breadcrumbsOptions={breadcrumbsOptions} />
    <PageLayoutContent
      header={header}
      main={main}
      sidebar={sidebar}
      sidebarScrollable={sidebarScrollable}
      footer={footer}
      responsiveStyle={responsiveStyle}
    />
  </PageContent>
)

export const PageLayoutContent = ({
  header,
  main,
  sidebar,
  sidebarScrollable,
  footer,
  responsiveStyle,
}: PageLayoutProps) => (
  <PageLayoutComponent header={header} main={main} sidebar={sidebar} footer={footer} responsiveStyle={responsiveStyle}>
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

export const PageHeaderWithButtons = styled(PageHeaderRow)`
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    gap: 16px;

    ${ButtonsGroup} {
      grid-auto-flow: row;
      grid-row-gap: 8px;
      width: 100%;

      button, a {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center:
        gap: 4px;
      }
    }
  }
`

const PageMain = styled.main`
  width: 100%;
  grid-area: main;
  height: 100%;
`

const PageSidebar = styled.aside<Pick<PageLayoutProps, 'sidebarScrollable'>>`
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

const SidebarStyle = css`
  aside {
    position: absolute;
    top: 0;
    bottom: 0;
    padding-left: 16px;

    > div {
      min-height: 184px;
      overflow: hidden;
    }
  }
`

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
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    'header'
    'main'
    'sidebar';

  @media (min-width: 1440px) {
    grid-template-columns: 9fr 3fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'header header'
      'main sidebar';
    ${SidebarStyle}
  }
`

const PageLayoutWithSidebarAndFooter = css`
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr auto;
  grid-template-areas:
    'header'
    'main'
    'sidebar'
    'footer';

  @media (min-width: 1440px) {
    grid-template-columns: 9fr 3fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'header header'
      'main sidebar'
      'footer footer';
    ${SidebarStyle}
  }
`

export const PageLayoutComponent = styled.div<PageLayoutProps>`
  display: grid;
  position: relative;
  align-items: start;
  grid-row-gap: 24px;
  width: 100%;
  min-height: 100%;

  aside {
    position: relative;
    width: 100%;
    grid-area: sidebar;

    > div {
      position: relative;
      width: 100%;
      max-width: 100%;
      height: 100%;
    }
  }

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
  ${(props) => props.responsiveStyle}
`
