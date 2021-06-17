import React, { useState } from 'react'
import styled from 'styled-components'

import { BreadcrumbsOptions } from '@/app/constants/breadcrumbs'

import { CloseButton } from '../../../buttons'
import { Notifications } from '../../../Notifications'

import { BreadcrumbsList } from './BreadcrumbsList'
import { HomeLink } from './HomeLink'

export interface BreadcrumbsProps {
  breadcrumbsOptions: BreadcrumbsOptions
  lastBreadcrumb?: string
}

export const Breadcrumbs = React.memo(({ breadcrumbsOptions, lastBreadcrumb }: BreadcrumbsProps) => {
  const [notificationsVisible, setNotificationsVisible] = useState(false)
  return (
    <>
      <BreadcrumbsNavigation>
        <TopRow>
          <HomeLink />
          <CloseButton onClick={() => setNotificationsVisible(true)} />
        </TopRow>
        <BreadcrumbsList lastBreadcrumb={lastBreadcrumb} breadcrumbsOptions={breadcrumbsOptions} />
      </BreadcrumbsNavigation>
      {notificationsVisible && <Notifications />}
    </>
  )
})

const BreadcrumbsNavigation = styled.nav`
  display: inline-flex;
  align-items: center;
  position: absolute;
  top: 6px;
  left: 0;
`

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
