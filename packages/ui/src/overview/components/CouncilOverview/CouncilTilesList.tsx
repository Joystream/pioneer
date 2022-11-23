import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { HorizontalScroller } from '@/common/components/HorizontalScroller/HorizontalScroller'
import { BN_ZERO } from '@/common/constants'
import { Comparator } from '@/common/model/Comparator'
import { useElectedCouncil } from '@/council/hooks/useElectedCouncil'
import { ElectionCandidate } from '@/council/types'
import { Election } from '@/council/types/Election'

import { CouncilTile } from './CouncilTile'

export const CouncilNormalTiles = () => {
  const { t } = useTranslation('overview')
  const { council } = useElectedCouncil()
  const councilors = council?.councilors
  const councilTiles = useMemo(
    () =>
      councilors?.map((councilor) => (
        <CouncilTile key={councilor.id} member={councilor.member} label={t('council.councilMember')} />
      )) ?? [],
    [councilors]
  )

  return <Scroller items={councilTiles} />
}

interface Props {
  election: Election
}

export const CouncilAnnouncingTiles = ({ election }: Props) => {
  const candidates = election?.candidates
  const councilTiles = useMemo(
    () =>
      candidates?.map((candidate) => (
        <CouncilTile key={candidate.id} member={candidate.member} label={candidate.info.title} />
      )),
    [candidates]
  )

  return <Scroller items={councilTiles} />
}

export const CouncilRevealingTiles = ({ election }: Props) => {
  const totalStake = election.candidates.reduce((prev, next) => prev.add(next.totalStake), BN_ZERO)
  const candidates = election?.candidates
  const councilTiles = useMemo(
    () =>
      candidates?.sort(Comparator<ElectionCandidate>(true, 'stake').bigNumber).map((candidate) => {
        const stakePercent = totalStake ? candidate.stake.muln(100).div(totalStake).toNumber() / 100 : 0
        return <CouncilTile key={candidate.id} member={candidate.member} stakePercent={stakePercent} />
      }),
    [candidates, totalStake]
  )

  return <Scroller items={councilTiles} />
}

const Scroller = styled(HorizontalScroller)`
  padding: 24px 10px;
`
