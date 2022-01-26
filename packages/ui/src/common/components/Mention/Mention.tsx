import React from 'react';
import styled from 'styled-components';

export interface MentionProps {
  children: React.ReactNode;
}

export const Mention = ({children}: MentionProps) => {

  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.span``;
