import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'

import { BountiesHeader } from './BountiesHeader'

export interface LayoutProps {
  children: React.ReactNode
}

export const BountiesLayout = ({ children }: LayoutProps) => {
  return <PageLayout header={<BountiesHeader />} main={children} />
}
