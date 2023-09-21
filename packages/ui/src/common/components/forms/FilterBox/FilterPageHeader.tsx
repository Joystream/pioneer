import React from 'react'
import styled from 'styled-components'

import { PageHeaderRow, PageHeaderWrapper } from '@/app/components/PageLayout'
import { PageTitle } from '@/common/components/page/PageTitle'

import { ButtonsGroup } from '../../buttons'

interface ProposalHeaderProps {
  title: string
  children?: React.ReactNode
  buttons?: React.ReactNode
}
export const FilterPageHeader = React.forwardRef(
  ({ title, children, buttons }: ProposalHeaderProps, ref: React.ForwardedRef<HTMLDivElement>) => (
    <PageHeaderWrapper>
      <HeaderWrapper>
        <PageTitle>{title}</PageTitle>
        <ButtonsGroup>
          <div ref={ref} />
          {buttons}
        </ButtonsGroup>
      </HeaderWrapper>
      {children}
    </PageHeaderWrapper>
  )
)

const HeaderWrapper = styled(PageHeaderRow)`
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    gap: 16px;

    ${ButtonsGroup} {
      grid-auto-flow: row;
      grid-row-gap: 8px;
      width: 100%;

      button {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center:
        gap: 4px;
      }
    }
  }
`
