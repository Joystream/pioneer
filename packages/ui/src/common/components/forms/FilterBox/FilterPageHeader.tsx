import React from 'react'

import { PageHeaderWithButtons, PageHeaderWrapper } from '@/app/components/PageLayout'
import { PageTitle } from '@/common/components/page/PageTitle'

import { ButtonsGroup } from '../../buttons'

interface ProposalHeaderProps {
  title: string
  children?: React.ReactNode
  buttons?: React.ReactNode
}
export const FilterPageHeader = React.forwardRef(
  ({ title, children, buttons }: ProposalHeaderProps, ref: React.ForwardedRef<HTMLDivElement>) => (
    <PageHeaderWrapper>
      <PageHeaderWithButtons>
        <PageTitle>{title}</PageTitle>
        <ButtonsGroup>
          <div ref={ref} />
          {buttons}
        </ButtonsGroup>
      </PageHeaderWithButtons>
      {children}
    </PageHeaderWrapper>
  )
)
