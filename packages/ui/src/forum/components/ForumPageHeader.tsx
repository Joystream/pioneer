import React, { useState } from 'react'

import { PageHeaderRow, PageHeaderWrapper } from '@/app/components/PageLayout'
import { ButtonsGroup } from '@/common/components/buttons'
import { SearchBox } from '@/common/components/forms/FilterBox/FilterSearchBox'
import { useModal } from '@/common/hooks/useModal'

interface ForumPageHeaderProps {
  title: React.ReactNode
  children?: React.ReactNode
  buttons?: React.ReactNode
}
export const ForumPageHeader = ({ title, children, buttons }: ForumPageHeaderProps) => {
  const [search, setSearch] = useState('')

  const { showModal } = useModal()

  return (
    <PageHeaderWrapper>
      <PageHeaderRow>
        {title}
        <ButtonsGroup>
          <SearchBox
            value={search}
            onChange={setSearch}
            onApply={() => showModal({ modal: 'SearchResults', data: { search } })}
          />
          {buttons}
        </ButtonsGroup>
      </PageHeaderRow>
      {children}
    </PageHeaderWrapper>
  )
}
