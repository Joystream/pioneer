import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { HorizontalScroller } from '@/common/components/HorizontalScroller/HorizontalScroller'
import { Loading } from '@/common/components/Loading'
import { formatDurationDate } from '@/common/components/statistics'
import { TextBig, TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { BorderRad, Colors, Shadows, Transitions } from '@/common/constants'
import { useGroupMaxWorkersNumber } from '@/working-groups/hooks/useGroupMaxWorkersNumber'
import { WorkingGroupOpening } from '@/working-groups/types'

interface TileProps {
  opening: WorkingGroupOpening
}

const WorkingGroupTile = React.memo(({ opening }: TileProps) => {
  const { t } = useTranslation('overview')
  const { groupId, title, expectedEnding, budget, rewardPerBlock, applicants } = opening
  const maxWorkersNumber = useGroupMaxWorkersNumber(groupId)
  const timeLeft = Date.parse(expectedEnding) - Date.now()

  return (
    <Wrapper>
      <Title bold black value>
        {title}
      </Title>
      <TimeLabel lighter as="div">
        {t('workingGroups.timeLeft')} {<DurationValue value={formatDurationDate(timeLeft)} />}
      </TimeLabel>
      <BudgetValue value={budget} />
      <TextMedium lighter>{t('workingGroups.rewardPerBlock', { value: rewardPerBlock })}</TextMedium>
      <ApplicantsLabel>
        {applicants}/{maxWorkersNumber ?? '-'}
      </ApplicantsLabel>
      <TextMedium lighter>{t('workingGroups.applicants')}</TextMedium>
    </Wrapper>
  )
})

interface ListProps {
  openings: WorkingGroupOpening[]
  isLoading: boolean
}

export const WorkingGroupsTilesList = React.memo(({ openings, isLoading }: ListProps) => {
  const { t } = useTranslation('overview')
  const tiles = openings.map((opening) => <WorkingGroupTile key={opening.id} opening={opening} />)
  return isLoading ? (
    <Loading />
  ) : (
    <ScrollerWrapper>
      <Scroller title={t('workingGroups.openings')} count={openings.length} items={tiles} />
    </ScrollerWrapper>
  )
})

const Wrapper = styled.div`
  max-width: 215px;
  min-width: 215px;
  height: 175px;
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
  margin-bottom: 8px;
`

const TimeLabel = styled(TextSmall)`
  & div {
    grid-column-gap: 2px;
    font-size: 12px;
    font-weight: 700;
    color: ${Colors.Black[500]};
  }
  & span {
    margin: 0 2px 0 0;
  }
`

const BudgetValue = styled(TokenValue)`
  font-size: 12px;
  margin-top: 5px;
`

const ApplicantsLabel = styled(TextSmall)`
  font-weight: 600;
  margin-top: 5px;
`

const ScrollerWrapper = styled.div`
  margin-top: 25px;
`

const Scroller = styled(HorizontalScroller)`
  padding: 24px 0 24px 10px;
`
