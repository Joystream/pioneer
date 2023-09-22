import React, { useState } from 'react'
import styled from 'styled-components'

import { PageHeaderRow, PageHeaderWrapper } from '@/app/components/PageLayout'
import { ButtonsGroup } from '@/common/components/buttons'
import { SearchBox } from '@/common/components/forms/FilterBox/FilterSearchBox'
import { useModal } from '@/common/hooks/useModal'

interface ForumPageHeaderProps {
  title: React.ReactNode
  children?: React.ReactNode
  buttons?: React.ReactNode
  description?: React.ReactNode
}
export const ForumPageHeader = ({ title, children, buttons, description }: ForumPageHeaderProps) => {
  const [search, setSearch] = useState('')

  const { showModal } = useModal()

  return (
    <PageHeaderWrapper>
      <HeaderWrapper>
        {title}
        <ButtonsGroup>
          <SearchBox
            value={search}
            onChange={setSearch}
            onApply={() => showModal({ modal: 'SearchResults', data: { search } })}
          />
          {buttons}
        </ButtonsGroup>
      </HeaderWrapper>
      {description && <PageHeaderRow>{description}</PageHeaderRow>}
      {children}
    </PageHeaderWrapper>
  )
}


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
