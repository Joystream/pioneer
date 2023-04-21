import * as React from 'react'
import styled from 'styled-components'

import { TextBig } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface AuthenticationInformationProps {
  icon?: React.ReactElement
  title: string
  children: React.ReactNode
}

interface AuthenticationWrapperProps {
  backgroundColor?: string;
}

export const AuthenticationInformation = ({ title, icon, children }: AuthenticationInformationProps) => {
  return (
    <AuthenticationWrapper backgroundColor={Colors.Red[50]}>
      <DetailsItemWrapper>
        <PositionedIcon>{icon}</PositionedIcon>
        <StyledDetailsText bold>{title}</StyledDetailsText>
      </DetailsItemWrapper>
      {children}
    </AuthenticationWrapper>
  )
}

export const AuthenticationWrapper = styled.div<AuthenticationWrapperProps>`
  background-color: ${(props) => props.backgroundColor ? props.backgroundColor : Colors.Red[50]};
  padding: 16px;
`

export const DetailsItemWrapper = styled.div`
  display: flex;
`
const PositionedIcon = styled.div`
  margin-top: 4px;
`

const StyledDetailsText = styled(TextBig)`
  margin: 0 0 8px 8px;
`
