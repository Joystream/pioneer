import React from 'react'
import { useTranslation } from 'react-i18next'

import { ListItem } from '@/common/components/List'
import { formatDuration } from '@/common/components/statistics'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { Subscription } from '@/common/components/typography/Subscription'
import { useBlocksToProposalExecution } from '@/proposals/hooks/useBlocksToProposalExecution'
import { useProposal } from '@/proposals/hooks/useProposal'
import { useProposalConstants } from '@/proposals/hooks/useProposalConstants'

import {
  ContentWrapper,
  ElementWrapper,
  StyledBadge,
  StyledClosedButton,
  StyledLink,
  StyledText,
  StyledTriangle,
  TimeWrapper,
  TopElementsWrapper,
} from './styles'

export interface ProposalListItemProps {
  proposalId: string
  title: string
  hideForStorage: (id: string) => void
}

export const ProposalListItem = ({ proposalId, title, hideForStorage }: ProposalListItemProps) => {
  const { t } = useTranslation('overview')
  const { proposal } = useProposal(proposalId)
  const constants = useProposalConstants(proposal?.details.type)
  const blocksToEnd = useBlocksToProposalExecution(proposal, constants) || 0

  const remainingCalculation = () => {
    const endsInSec = blocksToEnd * 6
    const oneDay = 86400
    const threeDay = 259200
    if (endsInSec < oneDay) {
      return '1day'
    }
    if (endsInSec > oneDay && endsInSec < threeDay) {
      return '3day'
    }
  }

  const urlAddress = '/#/proposals/preview/' + proposalId

  return (
    <ElementWrapper>
      <ListItem>
        <TopElementsWrapper>
          <StyledTriangle deadlineTime={remainingCalculation()} />{' '}
          <StyledClosedButton onClick={() => hideForStorage(proposalId)} />
        </TopElementsWrapper>
        <ContentWrapper>
          <TimeWrapper>
            <Subscription as="div">
              {t('deadline.remainingTime')} {<DurationValue value={formatDuration(blocksToEnd)} />}
            </Subscription>
            <StyledBadge>{t('deadline.proposal')}</StyledBadge>
          </TimeWrapper>
          <StyledText>
            {t('deadline.proposalMessage', { proposalName: title })}
            <StyledLink href={urlAddress}>{t('deadline.proposalLink')}</StyledLink>
          </StyledText>
        </ContentWrapper>
      </ListItem>
    </ElementWrapper>
  )
}
