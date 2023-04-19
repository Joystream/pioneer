import React from 'react'

import { LanguageSelect } from '@/common/components/LanguageSelect'
import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { SettingsTabs } from './components/SettingsTabs'

export const Language = () => {
  return <PageLayout header={<PageHeader title="Settings" tabs={<SettingsTabs />} />} main={<LanguageSelect />} />
}
