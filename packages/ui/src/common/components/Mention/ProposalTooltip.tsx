import { addSeconds, formatDistanceToNowStrict, isPast } from 'date-fns'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { cutText } from '@/common/helpers'
import { useBlocksToProposalExecution } from '@/proposals/hooks/useBlocksToProposalExecution'
import { useProposalConstants } from '@/proposals/hooks/useProposalConstants'
import { ProposalMention } from '@/proposals/types'

import { BadgeStatus } from '../BadgeStatus'

export interface ProposalTooltipProps {
  onMount(): void
  mention?: ProposalMention
  urlAddress?: string
}

export const ProposalTooltip = React.memo(({ mention, onMount, urlAddress }: ProposalTooltipProps) => {
  const { t } = useTranslation()
  const constants = useProposalConstants(mention?.type)
  const blocksUntil = useBlocksToProposalExecution(mention, constants)

  const distance = useMemo(() => {
    if (blocksUntil) {
      const date = addSeconds(new Date(), blocksUntil * 6)
      if (!isPast(date)) {
        return formatDistanceToNowStrict(date)
      }
    }
  }, [blocksUntil])

  const title = useMemo(() => mention?.title && cutText(mention.title, 20), [mention])

  const description = useMemo(() => mention?.description && cutText(mention.description), [mention])

  useEffect(() => {
    !mention && onMount()
  }, [])

  return (
    <Container id="proposal-tooltip">
      {mention ? (
        <>
          <TextSmall lighter>
            {distance
              ? t('mentions.tooltips.proposal.timeLeft', { time: distance })
              : t('mentions.tooltips.proposal.past')}
          </TextSmall>
          <Row>
            <a href={urlAddress}>
              <TextMedium bold>{title}</TextMedium>
            </a>
            <BadgeStatus inverted size="l">
              {mention.status}
            </BadgeStatus>
          </Row>
          {description && <TextMedium lighter>{description}</TextMedium>}
        </>
      ) : (
        <Loading />
      )}
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 14px;
  min-width: 150px;
`

const Row = styled.div`
  display: inline-flex;
  justify-content: space-between;
  ${TextMedium} {
    color: ${Colors.White};
    &:hover {
      color: ${Colors.Blue[500]};
    }
  }
`
