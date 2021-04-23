import React from 'react'

import { Activity } from '../../types'
import { ContentWithTabs } from '../page/PageContent'
import { Label } from '../typography'

import { Activities } from '.'

export interface ActivitiesBlockProps {
  activities: Activity[]
  label?: string
}

export const ActivitiesBlock = ({ activities, label }: ActivitiesBlockProps) => {
  return (
    <ContentWithTabs>
      {label && <Label>{label}</Label>}
      <Activities activities={activities} />
    </ContentWithTabs>
  )
}
