import {useApolloClient} from '@apollo/client';
import React, {useCallback, useMemo, useState} from 'react';
import styled from 'styled-components';

import {ApplicationIcon} from '@/common/components/icons';
import {ForumTooltip} from '@/common/components/Mention/ForumTooltip';
import {ProposalTooltip} from '@/common/components/Mention/ProposalTooltip';
import {ForumIcon, MyProfileIcon, WorkingGroupsIcon, ProposalsIcon} from '@/common/components/page/Sidebar/LinksIcons';
import {Tooltip} from '@/common/components/Tooltip';
import {TextMedium} from '@/common/components/typography';
import {Colors} from '@/common/constants';
import {
  GetProposalDocument,
  GetProposalQuery,
  GetProposalQueryVariables,
} from '@/proposals/queries';
import {asProposal, Proposal} from '@/proposals/types';

export type MentionType = 'proposal' | 'forum' | 'profile' | 'opening' | 'application';

export interface MentionProps {
  children: React.ReactNode;
  type: MentionType;
  itemId: string;
}

type TData = Proposal | undefined;

export const Mention = ({children, type, itemId}: MentionProps) => {
  const client = useApolloClient();
  const [data, setData] = useState<TData>();

  const query = useCallback(() => {
    switch (type) {
      default:
      case 'proposal': {
        return client.query<GetProposalQuery, GetProposalQueryVariables>({
          query: GetProposalDocument,
          variables: {
            where: { id: itemId }
          },
          fetchPolicy: 'cache-first',
        })
      }
    }
  }, [client, type])

  const onMount = useCallback(async () => {
    const { data } = await query();
    switch (type) {
      case 'proposal': {
        data.proposal && setData(asProposal(data.proposal));
      }
    }
  }, [query, type])

  const Icon = useMemo(() => {
    switch (type) {
      case 'proposal': {
        return <ProposalsIcon />
      }
      case 'forum': {
        return <ForumIcon />
      }
      case 'profile': {
        return <MyProfileIcon />
      }
      case 'opening': {
        return <WorkingGroupsIcon />
      }
      case 'application': {
        return <ApplicationIcon />
      }
    }
  }, [type])

  const Content = useMemo(() => {
    switch (type) {
      case 'proposal': {
        return <ProposalTooltip onMount={onMount} proposal={data} />
      }
      case 'forum': {
        return <ForumTooltip />
      }
    }
  }, [type, onMount, data])

  return (
    <Container>
      {Icon}
      <Tooltip popupContent={Content}>
        <TextMedium bold underline>{children}</TextMedium>
      </Tooltip>
    </Container>
  )
}

const Container = styled.div`
  display: inline-flex;
  column-gap: 5.33px;

  svg > path {
    fill: ${Colors.Blue[500]}
  }

  ${TextMedium} {
    cursor: pointer;
  }
`;
