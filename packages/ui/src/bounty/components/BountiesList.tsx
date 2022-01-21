import React, { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { sortingOptions } from '@/bounty/helpers'
import { BountyOrderByInput } from '@/common/api/queries'
import { CountBadge } from '@/common/components/CountBadge'
import { List } from '@/common/components/List'
import { SimpleSelect } from '@/common/components/selects'
import { TextBig } from '@/common/components/typography'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { GetSortProps } from '@/common/hooks/useSort'

import { Bounty } from '../types/Bounty'

import { BountyListItem } from './BountyListItem/BountyListItem'

interface Props {
  bounties: Bounty[]
  getSortProps?: GetSortProps<BountyOrderByInput>
}

export const BountiesList = memo(({ bounties, getSortProps }: Props) => {
  const { t } = useTranslation('bounty')
  const { onSort, isDescending } = getSortProps?.('createdAt') || {}

  const bountiesComponents = useMemo(() => {
    return bounties?.length ? (
      <StyledList as="div">
        {bounties.map((bounty) => {
          return <BountyListItem {...bounty} />
        })}
      </StyledList>
    ) : null
  }, [bounties.length])

  if (!bounties.length) {
    return <NotFoundText>{t('list.noResults')}</NotFoundText>
  }

  return (
    <div>
      <Header>
        <Title bold value>
          {t('bounties')}
          <Counter count={bounties.length} />
        </Title>
        {getSortProps && onSort ? (
          <SelectWrapper>
            <SimpleSelect
              options={sortingOptions}
              value={isDescending ? sortingOptions[0] : sortingOptions[1]}
              onChange={onSort}
            />
          </SelectWrapper>
        ) : null}
      </Header>
      {bountiesComponents}
    </div>
  )
})

const Title = styled(TextBig)`
  display: flex;
  align-items: center;
  width: fit-content;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const SelectWrapper = styled.div`
  max-width: 150px;
`

const Counter = styled(CountBadge)`
  margin-left: 12px;
`

const StyledList = styled(List)`
  row-gap: 16px;
`
