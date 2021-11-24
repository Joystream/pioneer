import React from 'react'

import { PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { PageTitle } from '@/common/components/page/PageTitle'

import Privacy from './md/Privacy.md'

export const PrivacyPolicy = () => {
  return (
    <PageLayout
      header={
        <PageHeaderWrapper>
          <PageTitle>Privacy Policy</PageTitle>
        </PageHeaderWrapper>
      }
      main={<MarkdownPreview markdown={Privacy} />}
    />
  )
}
