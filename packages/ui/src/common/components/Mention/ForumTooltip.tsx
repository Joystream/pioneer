import React from 'react';
import styled from 'styled-components';

import {TextMedium} from '@/common/components/typography';
import {Colors} from '@/common/constants';
import {ForumThread} from '@/forum/types';
import {MemberInfo} from '@/memberships/components';
import {Member} from '@/memberships/types';
import {Loading} from '@/common/components/Loading';

export interface ForumTooltipProps {
  data?: ForumThread;
  author?: Member;
  details?: string;
}

export const ForumTooltip = ({data, author, details}: ForumTooltipProps) => {
  return (
    <Container>
      {data && author ? <>
        <TextMedium bold>{data.title}</TextMedium>
        <MemberInfo member={author}/>
        <TextMedium lighter>
          {details}
        </TextMedium>
      </> : <Loading/>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 14px;

  ${TextMedium} {
    &:first-child {
      color: ${Colors.White}
    }
  }
`;
