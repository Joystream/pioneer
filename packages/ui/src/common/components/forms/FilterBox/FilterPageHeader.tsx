import React, { Fragment } from 'react'

import { PageHeaderRow, PageHeaderWrapper } from '@/app/components/PageLayout'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'

import { ButtonsGroup } from '../../buttons'

interface ProposalHeaderProps {
  title: string
  children?: React.ReactNode
  buttons?: React.ReactNode
  hasBackLink?: boolean
}
export const FilterPageHeader = React.forwardRef(
  ({ title, children, buttons, hasBackLink }: ProposalHeaderProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const TitleWrapper = hasBackLink ? PreviousPage : Fragment
    return (
      <PageHeaderWrapper>
        <PageHeaderRow>
          <TitleWrapper>
            <PageTitle>{title}</PageTitle>
          </TitleWrapper>
          <ButtonsGroup>
            <div ref={ref} />
            {buttons}
          </ButtonsGroup>
        </PageHeaderRow>
        {children}
      </PageHeaderWrapper>
    )
  }
)
