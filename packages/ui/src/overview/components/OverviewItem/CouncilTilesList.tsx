import React, { useMemo } from 'react'
import styled from 'styled-components'

import { HorizontalScroller } from '@/common/components/HorizontalScroller/HorizontalScroller'
import { useElectedCouncil } from '@/council/hooks/useElectedCouncil'
import { useElectionVotes } from '@/council/hooks/useElectionVotes'
import { Election } from '@/council/types/Election'

import { CouncilTile } from './CouncilTile'
import { Loading } from '@/common/components/Loading'
import { useTranslation } from 'react-i18next'

export const CouncilNormalTiles = () => {
  const { t } = useTranslation('overview')
  const { isLoading, council } = useElectedCouncil()
  console.log({council})
  const councilors = council?.councilors
  const councilTiles = useMemo(
    () => councilors?.map((councilor) => <CouncilTile member={councilor.member} label={t('council.councilMember')} />) ?? [],
    [councilors]
  )

  return (isLoading ? <Loading /> : <Scroller items={councilTiles} />)
}

interface Props {
  election: Election
}

export const CouncilAnnouncingTiles = ({ election }: Props) => {
  const candidates = election?.candidates
  const councilTiles = useMemo(
    () => candidates?.map((candidate) => <CouncilTile member={candidate.member} label={candidate.info.title} />),
    [candidates]
  )

  return <Scroller items={councilTiles} />
}

export const CouncilRevealingTiles = ({ election }: Props) => {
  const { sumOfStakes: totalStake } = useElectionVotes(election)
  const candidates = election?.candidates
  const councilTiles = useMemo(
    () =>
      candidates?.sort((a, b) => b.stake.toNumber() - a.stake.toNumber()).map((candidate) => {
        const stakePercent = totalStake ? candidate.stake.div(totalStake).toNumber() : 0
        return <CouncilTile member={candidate.member} stakePercent={stakePercent} />
      }),
    [candidates]
  )

  return <Scroller items={councilTiles} />
}

const Scroller = styled(HorizontalScroller)`
  padding: 24px 10px;
`
