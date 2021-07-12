import React from 'react'
import styled from 'styled-components'

import { Warning, WarningProps } from '@/common/components/Warning'

import { Activity } from '../../types'
import { ContentWithTabs } from '../page/PageContent'
import { Label } from '../typography'

import { Activities } from '.'

export interface ActivitiesBlockProps {
  activities: Activity[]
  label?: string
  warning?: WarningProps
  isOwn?: boolean
}

export const ActivitiesBlock = ({ activities, label, warning, isOwn }: ActivitiesBlockProps) => {
  return (
    <ActivitiesContent>
      {label && <Label>{label}</Label>}
      {warning && <Warning {...warning} />}
      <Activities activities={activities} isOwn={isOwn} />
    </ActivitiesContent>
  )
}

const ActivitiesContent = styled(ContentWithTabs)`
  grid-row-gap: 4px;
`
