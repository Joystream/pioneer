import React from 'react'

import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'

interface ProposalHeaderProps {
  title: string
  children?: React.ReactNode
}
export const FilterPageHeader = React.forwardRef(
  ({ title, children }: ProposalHeaderProps, ref: React.ForwardedRef<HTMLDivElement>) => (
    <PageHeader>
      <PageTitle>{title}</PageTitle>
      <div ref={ref} />
      {children}
    </PageHeader>
  )
)
