import { styled } from '@storybook/theming'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'

import { CloseButton } from '@/common/components/buttons'
import { ArrowRightIcon, FileIcon } from '@/common/components/icons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import {
  SidePane,
  SidePaneBody,
  SidePaneGlass,
  SidePaneHeader,
  SidePanelTop,
  SidePaneTitle,
} from '@/common/components/SidePane'
import { StatisticItem, StatisticsThreeColumns } from '@/common/components/statistics'
import { StatisticButton } from '@/common/components/statistics/StatisticButton'
import { TextInlineBig, TokenValue } from '@/common/components/typography'
import { capitalizeFirstLetter } from '@/common/helpers'
import { CreateLeadOpeningDetails } from '@/proposals/types/ProposalDetails'
import { GroupRewardPeriods, isKnownGroupName } from '@/working-groups/types'

import { ProposalPropertiesContent } from './ProposalDetails'

interface DetailsComponentProps {
  details: CreateLeadOpeningDetails
}

export const CreateLeadOpeningDetailsComponent: ProposalPropertiesContent<'createWorkingGroupLeadOpening'> = ({
  details,
}: DetailsComponentProps) => {
  const name = details.group?.name ?? ''
  const rewardPeriod = isKnownGroupName(name) ? GroupRewardPeriods[name] : new BN(1)
  const payoutAmount = rewardPeriod.mul(details.rewardPerBlock)
  const [isDescriptionVisible, setDescriptionVisible] = useState(false)
  const description = details.openingDescription ?? ''
  return (
    <>
      <StatisticsThreeColumns>
        <StatisticItem title="Working group">
          <TextInlineBig bold value>
            {capitalizeFirstLetter(name)}
          </TextInlineBig>
        </StatisticItem>
        <StatisticItem title="Stake amount">
          <TokenValue value={details.stakeAmount} />
        </StatisticItem>
        <StatisticItem title="Unstaking period">
          <TextInlineBig bold value>
            {details.unstakingPeriod.toString()} blocks
          </TextInlineBig>
        </StatisticItem>
        <StatisticItem title={`Reward per ${rewardPeriod.toString()} blocks`}>
          <TextInlineBig bold value>
            <TokenValue value={payoutAmount} />
          </TextInlineBig>
        </StatisticItem>
        <StatisticButton
          title="Description"
          onClick={() => {
            setDescriptionVisible(true)
          }}
          icon={<ArrowRightIcon />}
        >
          <FileIcon />
          <TextInlineBig bold value>
            Opening Description
          </TextInlineBig>
        </StatisticButton>
      </StatisticsThreeColumns>
      {isDescriptionVisible && (
        <OpeningDescriptionPreview description={description} onClose={() => setDescriptionVisible(false)} />
      )}
    </>
  )
}

interface DescriptionPreviewProps {
  onClose: () => void
  description: string
}

const OpeningDescriptionPreview = ({ onClose, description }: DescriptionPreviewProps) => {
  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  useEffect(() => {
    const escapeEvent = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', escapeEvent)

    return () => document.removeEventListener('keydown', escapeEvent)
  }, [])
  return (
    <SidePaneGlass onClick={onBackgroundClick}>
      <SidePane topSize="s">
        <SidePaneHeader>
          <SidePanelTop>
            <SidePaneTitle>Opening Description</SidePaneTitle>
            <CloseButton onClick={onClose} />
          </SidePanelTop>
        </SidePaneHeader>
        <SidePaneBody>
          <DescriptionContainer>
            <MarkdownPreview markdown={description} />
          </DescriptionContainer>
        </SidePaneBody>
      </SidePane>
    </SidePaneGlass>
  )
}

const DescriptionContainer = styled.div`
  padding: 12px 24px;
`
