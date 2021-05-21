import React from 'react'

import { Warning, WarningProps } from '@/common/components/Warning'

import { Activity } from '../../types'
import { ContentWithTabs } from '../page/PageContent'
import { Label } from '../typography'

import { Activities } from '.'

export interface ActivitiesBlockProps {
  activities: Activity[]
  label?: string
  warning?: WarningProps
}

export const ActivitiesBlock = ({ activities, label, warning }: ActivitiesBlockProps) => {
  return (
    <ContentWithTabs>
      {label && <Label>{label}</Label>}
      {warning && <Warning {...warning} />}
      <Activities activities={activities} />
    </ContentWithTabs>
  )
}
