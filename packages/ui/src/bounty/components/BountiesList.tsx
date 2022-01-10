import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { TextBig } from '@/common/components/typography'
import { NotFoundText } from '@/common/components/typography/NotFoundText'

import { Bounty } from '../types/Bounty'

import { BountyListItem } from './BountyListItem/BountyListItem'

interface Props {
  bounties: Bounty[]
}

export const BountiesList = memo(({ bounties }: Props) => {
  const { t } = useTranslation('bounty')

  if (!bounties.length) {
    return <NotFoundText>{t('list.noResults')}</NotFoundText>
  }

  return (
    <div>
      <Title bold value>
        {t('bounties')}
        <Counter count={bounties.length} />
      </Title>
      {bounties.map((bounty) => {
        return <BountyListItem {...bounty} />
      })}
    </div>
  )
})

const Title = styled(TextBig)`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  width: fit-content;
`

const Counter = styled(CountBadge)`
  margin-left: 12px;
`
