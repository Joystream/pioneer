import { styled } from '@storybook/theming'
import BN from 'bn.js'
import React, { useState } from 'react'

import { CloseButton } from '@/common/components/buttons'
import { Link } from '@/common/components/Link'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import {
  SidePane,
  SidePaneBody,
  SidePaneGlass,
  SidePaneHeader,
  SidePanelTop,
  SidePaneTitle,
} from '@/common/components/SidePane'
import { StatisticItem, Statistics } from '@/common/components/statistics'
import { TextBig, TokenValue } from '@/common/components/typography'
import { capitalizeFirstLetter } from '@/common/helpers'
import { CreateLeadOpeningDetails } from '@/proposals/types/ProposalDetails'
import { GroupRewardPeriods, isKnownGroupName } from '@/working-groups/types'

import { ProposalPropertiesContent } from './ProposalProperties'

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
      <Statistics>
        <StatisticItem title="Working group">
          <TextBig>{capitalizeFirstLetter(name)}</TextBig>
        </StatisticItem>
        <StatisticItem title="Stake amount">
          <TextBig>
            <TokenValue value={details.stakeAmount} />
          </TextBig>
        </StatisticItem>
        <StatisticItem title="Unstaking period">
          <TextBig>{details.unstakingPeriod.toString()} blocks</TextBig>
        </StatisticItem>
      </Statistics>
      <Statistics>
        <StatisticItem title={`Reward per ${rewardPeriod.toString()} blocks`}>
          <TextBig>
            <TokenValue value={payoutAmount} />
          </TextBig>
        </StatisticItem>
        <StatisticItem title="Description">
          <TextBig>
            <Link
              dark
              onClick={(evt) => {
                evt.preventDefault()
                setDescriptionVisible(true)
              }}
            >
              Opening Description
            </Link>
          </TextBig>
        </StatisticItem>
      </Statistics>
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
