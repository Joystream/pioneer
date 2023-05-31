import * as React from 'react'
import styled from 'styled-components'

import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface SettingsInformationProps {
  icon?: React.ReactElement
  title: string
  children: React.ReactNode
  type?: string
}

export const SettingsInformation = ({ title, icon, children, type }: SettingsInformationProps) => {
  return (
    <NetworkDetailsWrapper type={type}>
      <DetailsItemWrapper>
        {icon}
        <StyledDetailsText bold>{title}</StyledDetailsText>
      </DetailsItemWrapper>
      {children}
    </NetworkDetailsWrapper>
  )
}
interface NetworkDetailsWrapperProps {
  type?: string
}
export const NetworkDetailsWrapper = styled.div<NetworkDetailsWrapperProps>`
  background-color: ${(props) => {
    switch (props.type) {
      case 'error':
        return Colors.Red[50]
      default:
        return Colors.Blue[50]
    }
  }};
  padding: 16px;
`

export const DetailsItemWrapper = styled.div`
  display: flex;
`
const StyledDetailsText = styled(TextMedium)`
  margin: 0 0 8px 8px;
`
