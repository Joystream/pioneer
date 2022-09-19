import React, { useEffect } from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

export interface MemberTooltipProps {
  onMount(): void
  mention?: Member
}

export const MemberTooltip = ({ mention, onMount }: MemberTooltipProps) => {
  useEffect(() => {
    !mention && onMount()
  }, [])

  return (
    <Container>
      {mention ? <MemberInfo member={mention} size="s" memberSize="s" hideGroup isOnDark /> : <Loading />}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 14px;
  min-width: 150px;
`
