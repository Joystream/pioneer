import React from 'react'
import styled from 'styled-components'

import { TextBig, TextSmall } from '@/common/components/typography'
import { BorderRad, Shadows } from '@/common/constants'
import { CountBadge } from '@/common/components/CountBadge'
import { ForumThread } from '@/forum/types'
import { HorizontalScroller } from '@/common/components/HorizontalScroller/HorizontalScroller'
import { Loading } from '@/common/components/Loading'

interface TileProps {
  title: string
  answersCount: number
}

const ForumThreadTile = React.memo(({ title, answersCount }: TileProps) => {
  return (
    <Wrapper>
      <Label bold black value>
        {title}
      </Label>
      <CountBadge count={answersCount} />
    </Wrapper>
  )
})

interface ListProps {
  threads: ForumThread[]
}

export const ForumThreadTilesList = React.memo(({ threads }: ListProps) => {
  const tiles = threads.map((thread) => <ForumThreadTile title={thread.title} answersCount={thread.visiblePostsCount} />)
  return (!tiles ? <Loading /> : <Scroller items={tiles} />)
})

const Wrapper = styled.div`
  width: 215px;
  height: 145px;
  padding: 16px;
  border-radius: ${BorderRad.m};
  box-shadow: ${Shadows.light};
`

const Label = styled(TextBig)`
  margin-top: 20px;
  white-space: nowrap;
`

const Scroller = styled(HorizontalScroller)`
  padding: 24px 10px;
`
