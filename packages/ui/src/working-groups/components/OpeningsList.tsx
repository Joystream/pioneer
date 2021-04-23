import React from 'react'
import styled from 'styled-components'

import { BadgeViolet } from '../../common/components/BadgeViolet'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '../../common/components/buttons'
import { Toggle, ToggleButton } from '../../common/components/buttons/Toggle'
import { Arrow } from '../../common/components/icons'
import { List, ListItem } from '../../common/components/List'
import {
  StatiscticContentColumn,
  Statistics,
  StatsBlock,
  TwoColumnsStatistic,
} from '../../common/components/statistics'
import { TextBig, TextInlineBig, TokenValue } from '../../common/components/typography'
import { Fraction } from '../../common/components/typography/Fraction'
import { Subscription } from '../../common/components/typography/Subscription'
import { Colors, Overflow, Transitions } from '../../common/constants'
import { useModal } from '../../common/hooks/useModal'
import { useToggle } from '../../common/hooks/useToggle'
import { relativeTime } from '../../common/model/relativeTime'
import { ApplyForRoleModalCall } from '../modals/ApplyForRoleModal'
import { isOpeningOpen } from '../model/isOpeningOpen'
import { WorkingGroupOpening } from '../types'

export interface OpeningsListProps {
  openings: WorkingGroupOpening[]
}

const OpeningsListRow = ({ opening }: Props) => {
  const [isOpened, toggleOpen] = useToggle()

  return (
    <Toggle absoluteToggle isOpen={isOpened}>
      <OpeningItemContainer isOpen={isOpened}>
        <OpeningListItem opening={opening} />
        <OpeningDetails opening={opening} />
      </OpeningItemContainer>
      <ToggleButton absoluteToggle isOpen={isOpened} onClick={toggleOpen}>
        <Arrow direction="down" />
      </ToggleButton>
    </Toggle>
  )
}

export const OpeningsList = ({ openings }: OpeningsListProps) => {
  return (
    <List>
      {openings.map((opening) => (
        <ListItem key={opening.id}>
          <OpeningsListRow opening={opening} />
        </ListItem>
      ))}
    </List>
  )
}

type Props = {
  opening: WorkingGroupOpening
}

const OpeningListItem = ({ opening }: Props) => (
  <OpeningWrap>
    <OpeningItemInfo>
      <OpeningItemInfoTop>
        <Subscription>ID: {opening.id}</Subscription>
        <Subscription>Ends {relativeTime(opening.expectedEnding)}</Subscription>
        {opening.type === 'LEADER' ? <BadgeViolet>LEAD</BadgeViolet> : null}
      </OpeningItemInfoTop>
      <OpeningItemTitle>{opening.title}</OpeningItemTitle>
    </OpeningItemInfo>
    <OpeningItemSummary>
      <OpenItemSummaryColumn>
        <TextInlineBig>
          <TokenValue value={opening.reward.value} />
        </TextInlineBig>
        <OpeningSubscriptionWide>Reward per {opening.reward.interval} blocks.</OpeningSubscriptionWide>
      </OpenItemSummaryColumn>
      <OpenItemSummaryColumn>
        <Fraction numerator={opening.applicants.current} denominator={opening.applicants.total} sameSize />
        <Subscription>Applications</Subscription>
      </OpenItemSummaryColumn>
      <OpenItemSummaryColumn>
        <Fraction numerator={opening.hiring.current} denominator={opening.hiring.total} sameSize />
        <Subscription>Hiring</Subscription>
      </OpenItemSummaryColumn>
    </OpeningItemSummary>
  </OpeningWrap>
)

const OpeningDetails = ({ opening }: Props) => {
  const { showModal } = useModal()

  return (
    <OpenedContainer>
      <OpenedWrapper>
        <OpenedTop>
          <Subscription>Ends {relativeTime(opening.expectedEnding)}</Subscription>
          <OpenedItemTitle>{opening.title}</OpenedItemTitle>
        </OpenedTop>
        <TextBig light>
          Content Curators will one day be essential for ensuring that the petabytes of media items uploaded to
          Joystream are format...
        </TextBig>
        <Statistics withMargin>
          <StatsBlock size="m" centered spacing="s">
            <TextBig>
              <TokenValue value={opening.reward.value} />
            </TextBig>
            <Subscription>Reward per {opening.reward.interval} blocks</Subscription>
          </StatsBlock>
          <StatsBlock size="m" centered spacing="s">
            <TwoColumnsStatistic>
              <StatiscticContentColumn>
                <TextBig value bold>
                  {opening.applicants.total}
                </TextBig>
                <Subscription>Applicant limit</Subscription>
              </StatiscticContentColumn>
              <StatiscticContentColumn>
                <TextBig value bold>
                  {opening.hiring.total}
                </TextBig>
                <Subscription>Target no of Hires</Subscription>
              </StatiscticContentColumn>
            </TwoColumnsStatistic>
          </StatsBlock>
          <StatsBlock size="m" centered spacing="s">
            <TextBig>
              <TokenValue value={opening.reward.value} />
            </TextBig>
            <Subscription>Minimum Stake Required</Subscription>
          </StatsBlock>
        </Statistics>
        <ButtonsGroup align="right">
          <ButtonGhost size="medium">
            <Arrow direction="left" />
            Learn more
          </ButtonGhost>
          <ButtonPrimary
            size="medium"
            onClick={() => showModal<ApplyForRoleModalCall>({ modal: 'ApplyForRoleModal', data: { opening } })}
            disabled={!isOpeningOpen(opening)}
          >
            Apply now
          </ButtonPrimary>
        </ButtonsGroup>
      </OpenedWrapper>
    </OpenedContainer>
  )
}

const OpeningWrap = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 24px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 94px;
  padding: 16px 72px 16px 16px;
  background-color: ${Colors.White};
  transition: ${Transitions.all};
`

const OpenedContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: ${Transitions.all};
`

const OpenedWrapper = styled.div`
  display: grid;
  grid-row-gap: 16px;
  width: 100%;
  max-height: 100%;
  padding: 16px;
  background-color: ${Colors.Black[50]};
  overflow: hidden;
  transition: ${Transitions.all};
`

interface OpenedItemProps {
  isOpen?: boolean
}

const OpeningItemContainer = styled.div<OpenedItemProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  transition: ${Transitions.all};

  ${OpeningWrap} {
    margin-top: ${({ isOpen }) => (isOpen ? '-94px' : '0px')};
  }
  ${OpenedContainer} {
    max-height: ${({ isOpen }) => (isOpen ? '500px' : '0px')};
  }
`

const OpeningItemInfo = styled.div`
  display: grid;
  grid-template-rows: 26px 24px;
  grid-row-gap: 4px;
  width: 100%;
  max-width: 342px;
  align-items: center;
`

const OpeningItemInfoTop = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-column-gap: 16px;
  width: fit-content;
  max-width: 100%;
`

const OpeningItemSummary = styled.div`
  display: grid;
  grid-auto-flow: column;
  width: 100%;
  grid-column-gap: 40px;
`

const OpeningItemTitle = styled.h5`
  ${Overflow.Dots}
`

const OpenedItemTitle = styled.h4`
  ${Overflow.Dots}
`

const OpenItemSummaryColumn = styled.div`
  display: grid;
  grid-template-rows: 26px 24px;
  grid-row-gap: 4px;
  align-items: center;
`

const OpeningSubscriptionWide = styled(Subscription)`
  min-width: 136px;
`

const OpenedTop = styled.div`
  display: grid;
  grid-template-rows: 26px 28px;
  grid-row-gap: 8px;
  align-items: center;
`
