import React, { useMemo } from 'react'
import styled from 'styled-components'

import {
  BountyExpired,
  BountyFailed,
  BountyFunding,
  BountyWorking,
  BountyJudgement,
  BountySuccessful,
  BountyTerminated,
} from '@/bounty/components/BountyMainComponents'
import { Bounty } from '@/bounty/types/Bounty'
export interface BountyMainProps {
  bounty: Bounty
}

export const BountyMain = React.memo(({ bounty }: BountyMainProps) => {
  const page = useMemo(() => {
    if (bounty.isTerminated) {
      return <BountyTerminated bounty={bounty} />
    }

    switch (bounty.stage) {
      case 'funding':
        return <BountyFunding bounty={bounty} />
      case 'workSubmission':
        return <BountyWorking bounty={bounty} />
      case 'judgment':
        return <BountyJudgement bounty={bounty} />
      case 'expired':
        return <BountyExpired bounty={bounty} />
      case 'successful':
        return <BountySuccessful bounty={bounty} />
      case 'failed':
        return <BountyFailed bounty={bounty} />
      default:
        return null
    }
  }, [bounty])

  return <Container>{page}</Container>
})

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
