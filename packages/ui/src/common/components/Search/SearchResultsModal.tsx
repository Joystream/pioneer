import escapeStringRegexp from 'escape-string-regexp'
import React, { MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Close, CloseButton } from '@/common/components/buttons'
import { Input, InputComponent, InputIcon, InputNotification, InputText } from '@/common/components/forms'
import { SearchIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SearchResultItem } from '@/common/components/Search/SearchResultItem'
import { SidePane, SidePaneBody, SidePaneGlass } from '@/common/components/SidePane'
import { Tabs } from '@/common/components/Tabs'
import { Fonts } from '@/common/constants'
import { useEscape } from '@/common/hooks/useEscape'
import { useModal } from '@/common/hooks/useModal'
import { SearchKind, useSearch } from '@/common/hooks/useSearch'
import { ModalWithDataCall } from '@/common/providers/modal/types'
import { ThreadItemBreadcrumbs } from '@/forum/components/threads/ThreadItemBreadcrumbs'
import { ForumRoutes } from '@/forum/constant'

import { useDebounce } from '../../hooks/useDebounce'

export type SearchResultsModalCall = ModalWithDataCall<'SearchResults', { search: string }>

export const SearchResultsModal = () => {
  const { hideModal, modalData } = useModal<SearchResultsModalCall>()
  const [search, setSearch] = useState(modalData.search)
  const [activeTab, setActiveTab] = useState<SearchKind>('FORUM')
  const isValid = () => !debouncedSearch || debouncedSearch.length === 0 || debouncedSearch.length > 2
  const debouncedSearch = useDebounce(search, 400)
  const [validSearch, setLastValidSearch] = useState(debouncedSearch)
  const { forum, forumPostCount, isLoading } = useSearch(validSearch, activeTab)
  const pattern = useMemo(() => (validSearch ? RegExp(escapeStringRegexp(validSearch), 'ig') : null), [validSearch])
  useEffect(() => {
    if (isValid() && debouncedSearch.length !== 0) {
      setLastValidSearch(debouncedSearch)
    }
  }, [debouncedSearch])
  const history = useHistory()
  const [hasOverlay, setHasOverlay] = useState(true)
  useEffect(
    () =>
      history.listen((location) => {
        if (activeTab === 'FORUM' && location.pathname.startsWith(ForumRoutes.forum)) {
          setHasOverlay(false)
        } else {
          hideModal()
        }
      }),
    []
  )

  useEscape(() => hideModal())

  const overlayClickHandler = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => event.target === event.currentTarget && hideModal(),
    []
  )

  return (
    <SidePaneGlass onClick={hasOverlay ? overlayClickHandler : undefined}>
      <SearchResultsSidePane>
        <SearchResultsHeader>
          <CloseButton onClick={hideModal} />
          <SearchInput
            validation={isValid() ? undefined : 'invalid'}
            message={isValid() ? '' : 'Minimum of 3 characters is required'}
          >
            <InputText placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
          </SearchInput>
        </SearchResultsHeader>

        <SidePaneBody>
          <RowGapBlock gap={24}>
            <Tabs
              tabs={[
                {
                  title: 'Forum',
                  count: forumPostCount,
                  active: activeTab === 'FORUM',
                  onClick: () => setActiveTab('FORUM'),
                },
              ]}
              tabsSize="xs"
            />

            {isLoading ? (
              <Loading />
            ) : activeTab === 'FORUM' ? (
              forum.map(({ id, text, thread }, index) => (
                <SearchResultItem
                  key={index}
                  pattern={pattern}
                  breadcrumbs={<ThreadItemBreadcrumbs id={thread.categoryId} />}
                  to={`${generatePath(ForumRoutes.thread, { id: thread.id })}?post=${id}`}
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

  ${InputNotification} {
    position: absolute;
    top: 60px;
    left: 41px;
  }

  ${Input} {
    font-family: ${Fonts.Grotesk};
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    padding: 0 40px 1px 72px;
  }
`
