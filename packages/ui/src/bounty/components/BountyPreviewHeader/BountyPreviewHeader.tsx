import React, { useMemo } from 'react'

import { PageHeader } from '@/app/components/PageHeader'
import { Bounty, isPerpetual } from '@/bounty/types/Bounty'
import { BadgesRow } from '@/common/components/BadgeStatus/BadgesRow'
import { BadgeStatus } from '@/common/components/BadgeStatus/BadgeStatus'
import { ButtonGhost, ButtonPrimary } from '@/common/components/buttons'
import { BellIcon } from '@/common/components/icons/BellIcon'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { Member } from '@/memberships/types'

interface Props {
  bounty?: Bounty
  badgeNames?: string[]
}

export const BountyPreviewHeader = ({ bounty, badgeNames }: Props) => {
  const { active } = useMyMemberships()

  const compiledButtons = useMemo(() => {
    if (!bounty) return null

    switch (bounty.stage) {
      case 'funding':
        return <FundingStageButtons activeMember={active} bounty={bounty} />
      case 'workSubmission':
        return <WorkingStageButtons activeMember={active} bounty={bounty} />
      case 'judgment':
        return <JudgingStageButtons activeMember={active} bounty={bounty} />
      case 'successful':
        return <SuccessfulStageButtons bounty={bounty} />
      case 'failed':
        return <FailedStageButtons bounty={bounty} />
      case 'expired':
        return <ExpiredStageButtons activeMember={active} bounty={bounty} />
      default:
        return null
    }
  }, [bounty])

  const badges = useMemo(
    () => (
      <BadgesRow space={8}>
        {badgeNames?.map((badge) => (
          <BadgeStatus inverted>{badge}</BadgeStatus>
        ))}
      </BadgesRow>
    ),
    [badgeNames]
  )

  return <PageHeader title={bounty?.title || ''} buttons={compiledButtons} badges={badges} canGoBack />
}

interface BountyHeaderButtonsProps {
  bounty: Bounty
  activeMember?: Member
}

const FundingStageButtons = ({ bounty }: BountyHeaderButtonsProps) => {
  const shouldDisplayStatistics = isPerpetual(bounty.fundingType) && bounty?.contractType !== 'ContractOpen'

  return (
    <>
      {shouldDisplayStatistics && (
        <>
          <div>cherry {bounty.cherry}</div>
          <div>entrant stake {bounty.entrantStake}</div>
        </>
      )}
      <ButtonPrimary size="large">Contribute</ButtonPrimary>
    </>
  )
}

const WorkingStageButtons = ({ bounty, activeMember }: BountyHeaderButtonsProps) => {
  const hasAnnounced = bounty.entries?.some((entry) => entry.createdById === activeMember?.id)
  const hasSubmitted = bounty.entries?.some((entry) => entry.createdById === activeMember?.id && entry.hasSubmitted)

  if (bounty?.contractType !== 'ContractOpen') {
    return (
      <ButtonGhost size="large">
        <BellIcon /> Notify me about changes
      </ButtonGhost>
    )
  }

  return (
    <>
      {!hasAnnounced && <ButtonPrimary size="large">Announce Entry</ButtonPrimary>}
      {hasAnnounced && <ButtonPrimary size="large">Submit Work</ButtonPrimary>}
      {hasSubmitted && <ButtonGhost size="large">Withdraw</ButtonGhost>}
    </>
  )
}

const JudgingStageButtons = ({ bounty, activeMember }: BountyHeaderButtonsProps) => {
  const isOracle = bounty.oracle?.id === activeMember?.id

  return (
    <>
      <ButtonGhost size="large">
        <BellIcon /> Notify me about changes
      </ButtonGhost>
      {isOracle && <ButtonPrimary size="large">Submit Judgment</ButtonPrimary>}
    </>
  )
}

const SuccessfulStageButtons = ({ bounty, activeMember }: BountyHeaderButtonsProps) => {
  const isWinner = bounty.entries?.some((entry) => entry.createdById === activeMember?.id && entry.winner) // check in QN whether worker is a winner ???
  const isLoser = bounty.entries?.some((entry) => entry.createdById === activeMember?.id) && !isWinner
  const isContributor = bounty.contributors?.some((contributor) => contributor === activeMember?.id)

  return (
    <>
      <ButtonGhost size="large">
        <BellIcon /> Notify me about changes
      </ButtonGhost>
      {isWinner && <ButtonGhost size="large">Claim Reward</ButtonGhost>}
      {(isLoser || isContributor) && <ButtonGhost size="large">Withdraw Stake</ButtonGhost>}
    </>
  )
}

const FailedStageButtons = ({ bounty, activeMember }: BountyHeaderButtonsProps) => {
  const isWorker = bounty.entries?.some((entry) => entry.createdById === activeMember?.id)
  const isContributor = bounty.contributors?.some((contributor) => contributor === activeMember?.id)

  if (!isWorker && !isContributor) return null

  return (
    <>
      <ButtonGhost size="large">
        <BellIcon /> Notify me about changes
      </ButtonGhost>
      <ButtonGhost size="large">Withdraw Stake</ButtonGhost>
    </>
  )
}

const ExpiredStageButtons = ({ bounty, activeMember }: BountyHeaderButtonsProps) => {
  const isCreator = bounty.creator?.id === activeMember?.id

  if (!isCreator) return null

  return <ButtonPrimary size="large">Cancel Bounty</ButtonPrimary>
}
