import * as React from 'react'
import styled from 'styled-components'

import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface SettingsInformationProps {
  icon?: React.ReactElement
  title: string
  children: React.ReactNode
}

export const SettingsInformation = ({ title, icon, children }: SettingsInformationProps) => {
  return (
    <NetworkDetailsWrapper>
      <DetailsItemWrapper>
        {icon}
        <StyledDetailsText bold>{title}</StyledDetailsText>
      </DetailsItemWrapper>
      {children}
    </NetworkDetailsWrapper>
  )
}

export const NetworkDetailsWrapper = styled.div`
  background-color: ${Colors.Blue[50]};
  padding: 16px;
`

export const DetailsItemWrapper = styled.div`
  display: flex;
`
const StyledDetailsText = styled(TextMedium)`
  margin: 0 0 8px 8px;
`
