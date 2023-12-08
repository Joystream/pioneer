import React, { ReactNode, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { usePageTabs } from '@/app/hooks/usePageTabs'
import { BackendContext } from '@/app/providers/backend/context'
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
  fullWidth?: boolean
  children?: ReactNode
}

export const SettingsLayout = ({ saveButton, fullWidth, children }: SettingsLayoutProps) => {
  const { t } = useTranslation('settings')
  const backendContext = useContext(BackendContext)
  const notificationsTab = [t('notifications'), SettingsRoutes.notifications] as const
  const tabs = usePageTabs([
    [t('network'), SettingsRoutes.settings],
    ...(backendContext.backendClient ? [notificationsTab] : []),
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
      main={
        <Container fullWidth={fullWidth}>
          <MainPanel>{children}</MainPanel>
        </Container>
      }
    />
  )
}

export const Container = styled.div<{ fullWidth?: boolean }>`
  max-width: ${({ fullWidth = false }) => (fullWidth ? 'auto' : '690px')};
`
