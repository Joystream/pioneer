import React from 'react'

import { PageHeaderWrapper } from '@/app/components/PageLayout'
import { PageTitle } from '@/common/components/page/PageTitle'

interface ProposalHeaderProps {
  title: string
  children?: React.ReactNode
}
export const FilterPageHeader = React.forwardRef(
  ({ title, children }: ProposalHeaderProps, ref: React.ForwardedRef<HTMLDivElement>) => (
    <PageHeaderWrapper>
      <PageTitle>{title}</PageTitle>
      <div ref={ref} />
      {children}
    </PageHeaderWrapper>
  )
)
