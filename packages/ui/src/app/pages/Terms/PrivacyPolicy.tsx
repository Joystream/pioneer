import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'

import Privacy from './md/Privacy.md'

export const PrivacyPolicy = () => {
  return <PageLayout main={<MarkdownPreview markdown={Privacy} />} />
}
