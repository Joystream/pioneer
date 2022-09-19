import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { HorizontalScroller } from '@/common/components/HorizontalScroller/HorizontalScroller'
import { AnswerIcon } from '@/common/components/icons/AnswerIcon'
import { Loading } from '@/common/components/Loading'
import { Badge, TextBig, TextExtraSmall } from '@/common/components/typography'
import { BorderRad, Colors, Shadows, Transitions } from '@/common/constants'
import { ForumThread } from '@/forum/types'

interface TileProps {
  title: string
  answersCount: number
}

const ForumThreadTile = React.memo(({ title, answersCount }: TileProps) => {
  const { t } = useTranslation('overview')
  return (
    <Wrapper>
      <Title bold black value>
        {title}
      </Title>
      <LabelsWrapper>
        <NewBadge>{t('forum.new')}</NewBadge>
        <StyledAnswerIcon />
        <AnswersLabel bold lighter value>
          {t('forum.answers')}
        </AnswersLabel>
        <CountBadge count={answersCount} />
      </LabelsWrapper>
    </Wrapper>
  )
})

interface ListProps {
  threads: ForumThread[]
}

export const ForumThreadTilesList = React.memo(({ threads }: ListProps) => {
  const { t } = useTranslation('overview')
  const tiles = threads.map((thread) => (
    <ForumThreadTile key={thread.id} title={thread.title} answersCount={thread.visiblePostsCount} />
  ))
  return !tiles ? (
    <Loading />
  ) : (
    <ScrollerWrapper>
      <Scroller title={t('forum.latestThreads')} count={tiles.length} items={tiles} />
    </ScrollerWrapper>
  )
})

const Wrapper = styled.div`
  width: 215px;
  height: 115px;
  padding: 24px 16px;
  border-radius: ${BorderRad.m};
  box-shadow: ${Shadows.light};
`

const Title = styled(TextBig)`
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: ${Transitions.all};
`

const LabelsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`

const NewBadge = styled(Badge)`
  background-color: ${Colors.Blue[200]};
  text-transform: uppercase;
  margin-right: 16px;
`

const StyledAnswerIcon = styled(AnswerIcon)`
  color: ${Colors.Black[300]};
`

const AnswersLabel = styled(TextExtraSmall)`
  text-transform: uppercase;
  margin: 0 8px;
`

const ScrollerWrapper = styled.div`
  margin-top: 25px;
`

const Scroller = styled(HorizontalScroller)`
  padding: 24px 10px;
`
