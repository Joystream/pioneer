import * as React from 'react'
import styled from 'styled-components'

import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { TextBig, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export interface WarningWithActionProps {
  icon?: React.ReactElement
  title: string
  children: React.ReactNode
  button: React.ReactElement
  description: string
}

export const WarningWithAction = ({ title, icon, children, button, description }: WarningWithActionProps) => {
  return (
    <InformationWrapper>
      <InfoMainWrapper>
        <InfoTitleWrapper>
          {icon}
          <TextBig bold>{title}</TextBig>
        </InfoTitleWrapper>
        {children}
      </InfoMainWrapper>

      <InfodescriptionWrapper>
        {button}
        <TextMedium>{description}</TextMedium>
      </InfodescriptionWrapper>
    </InformationWrapper>
  )
}

export const InformationWrapper = styled.div`
  background-color: ${Colors.Negative[50]};
  padding: 16px;
`
export const InfoMainWrapper = styled.div`
  margin-bottom : 16px
`
export const InfoTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  margin-bottom : 8px
`
export const InfodescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`
