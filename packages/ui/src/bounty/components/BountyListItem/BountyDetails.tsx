import BN from 'bn.js'
import React, { useMemo, memo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { FundingDetails } from '@/bounty/components/BountyListItem/components/FundingDetails'
import { JudgmentDetails } from '@/bounty/components/BountyListItem/components/JudgmentDetails'
import { TerminatedDetails } from '@/bounty/components/BountyListItem/components/TerminatedDetails'
import { WithdrawalDetails } from '@/bounty/components/BountyListItem/components/WithdrawalDetails'
import { WorkingDetails } from '@/bounty/components/BountyListItem/components/WorkingDetails'
import { BountyPeriod, WorkEntry, FundingType } from '@/bounty/types/Bounty'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

interface Props {
  type: BountyPeriod
  oracle?: Member
  cherry: BN
  fundingType: FundingType
  totalFunding: BN
  entrantStake: BN
  entries?: WorkEntry[]
}

export const BountyDetails = memo(
  ({ type, oracle, cherry, fundingType, totalFunding, entrantStake, entries }: Props) => {
    const { t } = useTranslation('bounty')

    const entrants = useMemo(() => entries?.map((entry) => entry.worker), [entries?.length])

    const worksSubmitted = useMemo(
      () => entries?.reduce((prev, current) => prev + (current.works?.length || 0), 0),
      [entries?.length]
    )

    const worksWithdrawn = useMemo(() => entries?.filter((entry) => entry.withdrawn).length, [entries?.length])

    const winners = useMemo(
      () => entries?.filter((entry) => entry.winner).map((entry) => entry.worker),
      [entries?.length]
    )

    const content = useMemo(() => {
      switch (type) {
        case 'funding': {
          return <FundingDetails cherry={cherry} fundingType={fundingType} totalFunding={totalFunding} />
        }
        case 'working': {
          return (
            <WorkingDetails
              totalFunding={totalFunding}
              worksSubmitted={worksSubmitted}
              entrantStake={entrantStake}
              entrants={entrants}
            />
          )
        }
        case 'judgement': {
          return <JudgmentDetails withdrawals={worksWithdrawn} worksSubmitted={worksSubmitted} entrants={entrants} />
        }
        case 'terminated':
        case 'successful':
        case 'failed': {
          return <TerminatedDetails entrants={entrants} />
        }
        case 'expired': {
          return <WithdrawalDetails unwithdrawnFunds={totalFunding} winners={winners} entrants={entrants} />
        }
        default:
          return null
      }
    }, [type])

    return (
      <Wrapper>
        {content}
        <DetailBox title={t('tiles.oracle.title')}>
          {oracle ? (
            <MemberInfo avatarSmall={true} size="s" memberSize="s" hideGroup onlyTop member={oracle} />
          ) : (
            t('council')
          )}
        </DetailBox>
      </Wrapper>
    )
  }
)

const Wrapper = styled.div`
  flex: 4;
  width: 100%;
  display: flex;
  justify-content: space-between;
`
