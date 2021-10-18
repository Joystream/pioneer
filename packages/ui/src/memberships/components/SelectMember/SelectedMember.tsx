import React from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { BorderRad, Colors } from '@/common/constants'
import { MemberInfo } from '@/memberships/components/MemberInfo'
import { Member } from '@/memberships/types'

interface Props {
  member: Member | undefined
}

export const SelectedMember = ({ member }: Props) => (
  <Container>
    {member ? <MemberInfo member={member} memberSize="l" size="l" showGroup={false} skipModal /> : <Loading />}
  </Container>
)

const Container = styled.div`
  border: 1px solid ${Colors.Black[200]};
  border-radius: ${BorderRad.s};
  padding: 10px 16px 14px;
`
