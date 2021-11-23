import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'

import ToS from './md/ToS.md'

export const TermsOfService = () => {
  return <PageLayout main={<MarkdownPreview markdown={ToS} />} />
}
