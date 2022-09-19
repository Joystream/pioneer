import React from 'react'

import { Loading } from '@/common/components/Loading'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { MemberInfo } from '@/memberships/components'
import { useMember } from '@/memberships/hooks/useMembership'

interface Props {
  label: string
  value: string
}

export const Member = ({ label, value }: Props) => {
  const { member, isLoading } = useMember(value)

  return (
    <Row>
      <RowGapBlock gap={4}>
        <Label>{label}</Label>
        {isLoading || !member ? <Loading /> : <MemberInfo member={member} memberSize="s" skipModal />}
      </RowGapBlock>
    </Row>
  )
}
