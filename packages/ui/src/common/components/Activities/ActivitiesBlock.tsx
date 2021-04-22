import React from 'react'
import styled from 'styled-components'

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
    <ActivitiesBlockContainer>
      {label && <Label>{label}</Label>}
      <Activities activities={activities} />
    </ActivitiesBlockContainer>
  )
}

const ActivitiesBlockContainer = styled(ContentWithTabs)`
  margin-top: 12px;
`
