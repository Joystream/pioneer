import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'

const Header = () => <div>Header</div>

export interface CurrentProps {
  children: React.ReactNode
}

export const BountiesLayout = ({ children }: CurrentProps) => {
  return <PageLayout main={children} header={<Header />} />
}
