import React, { useMemo } from 'react'
import styled from 'styled-components'

import { BountyExpired } from '@/bounty/components/BountyExpired/BountyExpired'
import { BountyFailed } from '@/bounty/components/BountyFailed/BountyFailed'
import { Bounty } from '@/bounty/types/Bounty'
import { BountyFunding } from '@/bounty/components/BountyFunding'
import { BountyWorking } from '@/bounty/components/BountyWorking'
import { BountyJudgement } from '@/bounty/components/BountyJudgement'

export interface BountyMainProps {
  bounty: Bounty
}

export const BountyMain = ({ bounty }: BountyMainProps) => {
  const page = useMemo(() => {
    switch (bounty.stage) {
      case 'funding': 
        return <BountyFunding bounty={bounty} />
      case 'workSubmission':
        return <BountyWorking bounty={bounty} />
      case 'judgment':
        return <BountyJudgement bounty={bounty} />
      case 'expired':
        return <BountyExpired bounty={bounty} />
      case 'failed':
        return <BountyFailed bounty={bounty} />
      default:
        return null
    }
  }, [bounty.stage])

  return <Container>{page}</Container>
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
