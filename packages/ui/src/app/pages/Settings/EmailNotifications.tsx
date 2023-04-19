import React, { useState, useEffect, EventHandler } from 'react'

import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { SettingsTabs } from './components/SettingsTabs'
import { EmptyPagePlaceholder } from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'

export const EmailNotifications = () => (
  <PageLayout
    header={
      <PageHeader
        title="Settings"
        tabs={<SettingsTabs />}
      />
    }
    main={
      <EmptyPagePlaceholder
        title="Subscribe to email notifications"
        copy="We use your email only to send you important notifications.
      You can customize what kind of notifications you receive anytime in settings."
        button={
          <TransactionButton style="primary" size="medium" >
            Subscribe
          </TransactionButton>
        }
      />
    }
  />
)
