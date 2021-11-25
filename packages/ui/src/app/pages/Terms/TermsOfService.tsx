import React from 'react'

import { PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { PageTitle } from '@/common/components/page/PageTitle'

import ToS from './md/ToS.md'

export const TermsOfService = () => {
  return (
    <PageLayout
      header={
        <PageHeaderWrapper>
          <PageTitle>Terms of Service</PageTitle>
        </PageHeaderWrapper>
      }
      main={<MarkdownPreview markdown={ToS} />}
    />
  )
}
