import React, { useState } from 'react'

import { PageHeaderRow, PageHeaderWrapper } from '@/app/components/PageLayout'
import { ButtonsGroup } from '@/common/components/buttons'
import { useModal } from '@/common/hooks/useModal'

interface ForumPageHeaderProps {
  title: React.ReactNode
  children?: React.ReactNode
  buttons?: React.ReactNode
}
export const ForumPageHeader = ({ title, children, buttons }: ForumPageHeaderProps) => {
  return (
    <PageHeaderWrapper>
      <PageHeaderRow>
        {title}
        <ButtonsGroup>{buttons}</ButtonsGroup>
      </PageHeaderRow>
      {children}
    </PageHeaderWrapper>
  )
}
