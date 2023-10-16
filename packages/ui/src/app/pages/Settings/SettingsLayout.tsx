import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { usePageTabs } from '@/app/hooks/usePageTabs'
import { ButtonPrimary } from '@/common/components/buttons'
import { MainPanel } from '@/common/components/page/PageContent'
import { Tabs } from '@/common/components/Tabs'

import { SettingsRoutes } from './routes'

export type SettingsLayoutProps = {
  saveButton?: {
    isVisible: boolean
    disabled: boolean
    onClick: () => void
  }
  children?: ReactNode
}

export const SettingsLayout = ({ saveButton, children }: SettingsLayoutProps) => {
  const { t } = useTranslation('settings')
  const tabs = usePageTabs([
    [t('network'), SettingsRoutes.settings],
    [t('notifications'), SettingsRoutes.notifications],
  ])
  return (
    <PageLayout
      header={
        <PageHeader
          title={t('settings')}
          tabs={<Tabs tabs={tabs} />}
          buttons={
            saveButton?.isVisible ? (
              <ButtonPrimary disabled={saveButton.disabled} size="large" onClick={saveButton.onClick}>
                Save changes
              </ButtonPrimary>
            ) : undefined
          }
        />
      }
      main={<MainPanel>{children}</MainPanel>}
    />
  )
}
