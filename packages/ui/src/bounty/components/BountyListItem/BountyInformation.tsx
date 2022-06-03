import React, { memo } from 'react'
import styled from 'styled-components'

import { BlockDurationStatistics } from '@/common/components/statistics'
import { TextHuge, TextMedium } from '@/common/components/typography'
import { MemberInfoAvatar } from '@/memberships/components/Avatar'
import { Member } from '@/memberships/types'

interface Props {
  title: string
  creator?: Member
  timeToEnd?: number
}

export const BountyInformation = memo(({ creator, timeToEnd, title }: Props) => {
  return (
    <Wrapper>
      <TitleContainer>
        {creator && (
          <TextMedium as="div" bold>
            {creator.handle}
            <AvatarWrapper>
              <MemberInfoAvatar member={creator} avatarUri={creator.avatar} />
            </AvatarWrapper>
          </TextMedium>
        )}
        <Title bold>{title}</Title>
      </TitleContainer>
      <BadgeDurationContainer>
        {timeToEnd && (
          <BlockDurationStatistics
            size="s"
            value={timeToEnd}
            title="Time left"
            hideBlockNumber
            dynamicBlockCount={timeToEnd}
          />
        )}
      </BadgeDurationContainer>
    </Wrapper>
  )
})

const Wrapper = styled.div<{ isTerminated?: boolean }>`
  flex: 6;
  width: 100%;
  display: flex;
`

const TitleContainer = styled.div`
  flex: 4;
  min-width: 0;
  row-gap: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px 0;

  > *:first-child {
    position: relative;
  }
`

const BadgeDurationContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  column-gap: 16px;

  > div:first-child {
    margin-top: 27px;
  }

  > div:nth-child(2) {
    margin-top: 17px;
    max-width: 160px;
  }
`
const AvatarWrapper = styled.div`
  position: absolute;
  top: -10px;
  left: -45px;
`

const Title = styled(TextHuge)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 90%;
  width: min-content;
`
