import {formatDistanceToNowStrict, isPast} from 'date-fns';
import React, {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {Loading} from '@/common/components/Loading';
import {TextMedium, TextSmall} from '@/common/components/typography';
import {Colors} from '@/common/constants';
import {Proposal} from '@/proposals/types';

import {BadgeStatus} from '../BadgeStatus';

export interface ProposalTooltipProps {
  onMount?(): void;

  proposal?: Proposal;
  details?: string;
}

export const ProposalTooltip = React.memo(({proposal, details, onMount}: ProposalTooltipProps) => {
  const {t} = useTranslation();

  const distance = useMemo(() => {
    const date = proposal?.endedAt && new Date(proposal.endedAt);
    if (date && !isPast(date)) {
      return formatDistanceToNowStrict(date)
    }
  }, [proposal])

  useEffect(() => {
    !proposal && onMount?.();
  }, [])

  return (
    <Container>
      {proposal ? <>
        {distance && <TextSmall lighter>{t('mentions.tooltips.proposal.timeLeft', {time: distance})}</TextSmall>}
        <Row>
          <TextMedium bold>{proposal.title}</TextMedium>
          <BadgeStatus inverted size="l">{proposal.status}</BadgeStatus>
        </Row>
        <TextMedium lighter>
          {details}
        </TextMedium>
      </> : <Loading/>}
    </Container>
  );
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 14px;
`;

const Row = styled.div`
  display: inline-flex;
  justify-content: space-between;

  ${TextMedium} {
    color: ${Colors.White};
  }
`;
