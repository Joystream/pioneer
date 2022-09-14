import React from 'react'

import { Loader } from '@/common/components/icons'
import { StatisticItem } from '@/common/components/statistics'
import { TextBig } from '@/common/components/typography'
import { MemberInfo } from '@/memberships/components'
import { useMember } from '@/memberships/hooks/useMembership'

interface Props {
  label: string
  value: string
}

export const Member = ({ label, value }: Props) => {
  const { member, isLoading } = useMember(value)

  return (
    <StatisticItem title={label}>
      {isLoading ? (
        <Loader />
      ) : member ? (
        <MemberInfo member={member} memberSize="m" />
      ) : (
        <TextBig bold value>
          Unknown
        </TextBig>
      )}
    </StatisticItem>
  )
}
