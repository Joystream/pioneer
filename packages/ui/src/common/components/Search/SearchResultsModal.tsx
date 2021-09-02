import escapeStringRegexp from 'escape-string-regexp'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { Close, CloseButton } from '@/common/components/buttons'
import { Input, InputComponent, InputIcon, InputText } from '@/common/components/forms'
import { SearchIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SearchResultItem } from '@/common/components/Search/SearchResultItem'
import { SidePane, SidePaneBody, SidePaneGlass } from '@/common/components/SidePane'
import { Tabs } from '@/common/components/Tabs'
import { Fonts } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { SearchKind, useSearch } from '@/common/hooks/useSearch'
import { ModalWithDataCall } from '@/common/providers/modal/types'
import { ForumRoutes } from '@/forum/constant'

import { ForumPostResultBreadcrumbs } from './SearchResultBreadcrumbs'

export type SearchResultsModalCall = ModalWithDataCall<'SearchResults', { search: string }>

export const SearchResultsModal = () => {
  const { hideModal, modalData } = useModal<SearchResultsModalCall>()

  const [search, setSearch] = useState(modalData.search)
  const [activeTab, setActiveTab] = useState<SearchKind>('FORUM')
  const { forum, isLoading } = useSearch(search, activeTab)
  const pattern = useMemo(() => (search ? RegExp(escapeStringRegexp(search), 'ig') : null), [search])

  return (
    <SidePaneGlass onClick={(event) => event.target === event.currentTarget && hideModal()}>
      <SearchResultsSidePane>
        <SearchResultsHeader>
          <CloseButton onClick={hideModal} />
          <SearchInput>
            <InputText placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
          </SearchInput>
        </SearchResultsHeader>

        <SidePaneBody>
          <RowGapBlock gap={24}>
            <Tabs
              tabs={[{ title: 'Forum', active: activeTab === 'FORUM', onClick: () => setActiveTab('FORUM'), count: 4 }]}
              tabsSize="xs"
            />

            {isLoading ? (
              <Loading />
            ) : activeTab === 'FORUM' ? (
              forum.map(({ id, text, thread }, index) => (
                <SearchResultItem
                  key={index}
                  pattern={pattern}
                  breadcrumbs={<ForumPostResultBreadcrumbs id={thread.categoryId} />}
                  to={`${ForumRoutes.thread}/${thread.id}?post=${id}`}
                  title={thread.title}
                >
                  {text}
                </SearchResultItem>
              ))
            ) : null}
          </RowGapBlock>
        </SidePaneBody>
      </SearchResultsSidePane>
    </SidePaneGlass>
  )
}

const SearchResultsSidePane = styled(SidePane)`
  grid-template-rows: 88px 1fr;

  ${SidePaneBody} {
    padding: 24px;
  }
`

const SearchResultsHeader = styled.div`
  position: relative;
  ${Close} {
    position: absolute;
    top: 18px;
    right: 24px;
    z-index: 1;
  }
`

const SearchInput = styled(InputComponent).attrs({
  icon: <SearchIcon />,
  borderless: true,
  inputSize: 'auto',
})`
  align-items: stretch;
  height: 100%;

  ${InputIcon} {
    left: 40px;
  }

  ${Input} {
    font-family: ${Fonts.Grotesk};
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    padding: 0 40px 1px 72px;
  }
`
