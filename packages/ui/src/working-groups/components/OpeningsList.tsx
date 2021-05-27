import React from 'react'

import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'

import { BadgeViolet } from '../../common/components/BadgeViolet'
import { ButtonPrimary, ButtonsGroup } from '../../common/components/buttons'
import { Toggle } from '../../common/components/buttons/Toggle'
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
import { useModal } from '../../common/hooks/useModal'
import { useToggle } from '../../common/hooks/useToggle'
import { relativeTime } from '../../common/model/relativeTime'
import { ApplyForRoleModalCall } from '../modals/ApplyForRoleModal'
import { isOpeningOpen } from '../model/isOpeningOpen'
import { WorkingGroupOpening } from '../types'

import {
  OACItemContainer,
  OACItemInfo,
  OACItemInfoTop,
  OACItemSummary,
  OACItemTitle,
  OACSubscriptionWide,
  OACWrap,
  OpenedContainer,
  OpenedItemTitle,
  OpenedTop,
  OpenedWrapper,
  OpeningToggleButton,
  OpenItemSummaryColumn,
} from './OpeningAndApplicationsComponents/OACStyledComponents'

export interface OpeningsListProps {
  openings: WorkingGroupOpening[]
}

const OpeningsListRow = ({ opening }: Props) => {
  const [isOpened, toggleOpen] = useToggle()

  return (
    <Toggle absoluteToggle isOpen={isOpened}>
      <OACItemContainer isOpen={isOpened}>
        <OpeningListItem opening={opening} />
        <OpeningDetails opening={opening} />
      </OACItemContainer>
      <OpeningToggleButton absoluteToggle isOpen={isOpened} onClick={toggleOpen}>
        <Arrow direction="down" />
      </OpeningToggleButton>
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
  <OACWrap>
    <OACItemInfo>
      <OACItemInfoTop>
        <Subscription>ID: {opening.id}</Subscription>
        <Subscription>Ends {relativeTime(opening.expectedEnding)}</Subscription>
        {opening.type === 'LEADER' ? <BadgeViolet>LEAD</BadgeViolet> : null}
      </OACItemInfoTop>
      <OACItemTitle>{opening.title}</OACItemTitle>
    </OACItemInfo>
    <OACItemSummary>
      <OpenItemSummaryColumn>
        <TextInlineBig>
          <TokenValue value={opening.reward.value} />
        </TextInlineBig>
        <OACSubscriptionWide>Reward per {opening.reward.interval} blocks.</OACSubscriptionWide>
      </OpenItemSummaryColumn>
      <OpenItemSummaryColumn>
        <Fraction numerator={opening.applicants.current} denominator={opening.applicants.total} sameSize />
        <Subscription>Applications</Subscription>
      </OpenItemSummaryColumn>
      <OpenItemSummaryColumn>
        <Fraction numerator={opening.hiring.current} denominator={opening.hiring.total} sameSize />
        <Subscription>Hiring</Subscription>
      </OpenItemSummaryColumn>
    </OACItemSummary>
  </OACWrap>
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
          <LinkButtonGhost size="medium" to={`/working-groups/openings/${opening.id}`}>
            <Arrow direction="left" />
            Learn more
          </LinkButtonGhost>
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
