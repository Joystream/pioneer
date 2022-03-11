import BN from 'bn.js'
import React, { useMemo } from 'react'
import { TFunction, useTranslation } from 'react-i18next'

import { PageHeader } from '@/app/components/PageHeader'
import {
  AnnounceWorkEntryButton,
  CancelBountyButton,
  ClaimRewardButton,
  ContributeFundsButton,
  SubmitWorkButton,
  WithdrawStakeButton,
  WithdrawWorkEntryButton,
  SubmitJudgementButton,
} from '@/bounty/components/modalsButtons'
import { WithdrawContributionButton } from '@/bounty/components/modalsButtons/WithdrawContributionButton'
import { Bounty, isBountyEntryStatusWinner, isFundingLimited, WorkEntry } from '@/bounty/types/Bounty'
import { BadgesRow } from '@/common/components/BadgeStatus/BadgesRow'
import { BadgeStatus } from '@/common/components/BadgeStatus/BadgeStatus'
import { ButtonGhost } from '@/common/components/buttons'
import { BellIcon } from '@/common/components/icons/BellIcon'
import { BN_ZERO } from '@/common/constants'
import { isDefined } from '@/common/utils'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { Member } from '@/memberships/types'

interface Props {
  bounty?: Bounty
  badgeNames?: string[]
}

export const BountyPreviewHeader = React.memo(({ bounty, badgeNames }: Props) => {
  const { t } = useTranslation('bounty')
  const { active: activeMember } = useMyMemberships()

  const compiledButtons = useMemo(() => {
    if (!bounty) {
      return null
    }

    const buttonsProps: BountyHeaderButtonsProps = { t, bounty, activeMember }

    switch (bounty.stage) {
      case 'funding':
        return <FundingStageButtons {...buttonsProps} />
      case 'workSubmission':
        return <WorkingStageButtons {...buttonsProps} />
      case 'judgment':
        return <JudgingStageButtons {...buttonsProps} />
      case 'successful':
        return <SuccessfulStageButtons {...buttonsProps} />
      case 'failed':
        return <FailedStageButtons {...buttonsProps} />
      case 'expired':
        return <ExpiredStageButtons {...buttonsProps} />
      default:
        return null
    }
  }, [bounty, activeMember])

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
})

interface BountyHeaderButtonsProps {
  bounty: Bounty
  activeMember?: Member
  t: TFunction
}

const FundingStageButtons = React.memo(({ bounty, t, activeMember }: BountyHeaderButtonsProps) => {
  const shouldDisplayStatistics = !isFundingLimited(bounty.fundingType) && isDefined(bounty?.entrantWhitelist)
  const bountyCreator = bounty.creator
  const isCreator = bountyCreator?.id === activeMember?.id
  const isCancelAvailable = bounty.totalFunding > BN_ZERO

  if (!isCreator || !bountyCreator) {
    return <ContributeFundsButton bounty={bounty} />
  }
  if (isCancelAvailable) {
    return <CancelBountyButton bounty={bounty} creator={bountyCreator} />
  }
  return (
    <>
      {shouldDisplayStatistics && (
        <>
          <div>
            {t('bountyFields.cherry')} {bounty.cherry.toNumber()}
          </div>
          <div>
            {t('bountyFields.entrantStake')} {bounty.entrantStake.toNumber()}
          </div>
        </>
      )}
    </>
  )
})

const WorkingStageButtons = React.memo(({ bounty, activeMember, t }: BountyHeaderButtonsProps) => {
  const userEntry = useMemo(() => bounty.entries?.find((entry) => entry.worker.id === activeMember?.id), [
    bounty,
    activeMember?.id,
  ])
  const hasAnnounced = !!userEntry
  const hasSubmitted = hasAnnounced && userEntry.hasSubmitted
  const isOnWhitelist = useMemo(() => activeMember && bounty.entrantWhitelist?.includes(activeMember.id), [
    bounty,
    activeMember?.id,
  ])

  if (isDefined(bounty?.entrantWhitelist) && !isOnWhitelist) {
    {
      /* TODO: https://github.com/Joystream/pioneer/issues/1937 */
    }
    return (
      <ButtonGhost size="large">
        <BellIcon /> {t('common:buttons.notifyAboutChanges')}
      </ButtonGhost>
    )
  }

  return (
    <>
      {!hasAnnounced && <AnnounceWorkEntryButton bounty={bounty} />}
      {hasAnnounced && <SubmitWorkButton bounty={bounty} />}
      {hasSubmitted && <WithdrawWorkEntryButton bounty={bounty} entry={userEntry} />}
    </>
  )
})

const JudgingStageButtons = React.memo(({ bounty, activeMember, t }: BountyHeaderButtonsProps) => {
  const isOracle = bounty.oracle?.id === activeMember?.id

  return (
    <>
      <ButtonGhost size="large">
        <BellIcon /> {t('common:buttons.notifyAboutChanges')}
      </ButtonGhost>
      {isOracle && <SubmitJudgementButton bounty={bounty} />}
    </>
  )
})

const getReward = (entry: WorkEntry) => {
  return isBountyEntryStatusWinner(entry.status) ? new BN(entry.status.reward) : undefined
}

const SuccessfulStageButtons = React.memo(({ bounty, activeMember, t }: BountyHeaderButtonsProps) => {
  const userEntry = useMemo(() => bounty.entries?.find((entry) => entry.worker.id === activeMember?.id), [
    bounty,
    activeMember?.id,
  ])
  const entryId = userEntry?.id
  const reward = userEntry ? getReward(userEntry) : undefined
  const { winner, passed } =
    useMemo(() => bounty.entries?.find((entry) => entry.worker.id === activeMember?.id), [bounty, activeMember?.id]) ||
    {}
  const winnerConditions = winner && entryId && reward
  const isContributor = useMemo(
    () => bounty.contributors?.some((contributor) => contributor.actor?.id === activeMember?.id),
    [bounty, activeMember?.id]
  )
  return (
    <>
      <ButtonGhost size="large">
        <BellIcon /> {t('common:buttons.notifyAboutChanges')}
      </ButtonGhost>
      {winnerConditions && <ClaimRewardButton bountyId={bounty.id} entryId={entryId} reward={reward} />}
      {(passed || isContributor) && isContributor ? (
        <WithdrawContributionButton bounty={bounty} />
      ) : (
        <WithdrawStakeButton bounty={bounty} />
      )}
    </>
  )
})

const FailedStageButtons = React.memo(({ bounty, activeMember, t }: BountyHeaderButtonsProps) => {
  const isContributor = useMemo(
    () => bounty.contributors?.some((contributor) => contributor.actor?.id === activeMember?.id),
    [bounty, activeMember?.id]
  )

  const userEntry = useMemo(() => bounty.entries?.find((entry) => entry.worker.id === activeMember?.id), [
    bounty,
    activeMember?.id,
  ])
  const hasAnnounced = !!userEntry
  const hasSubmitted = hasAnnounced && userEntry.hasSubmitted
  const hasLost = hasSubmitted && !userEntry.winner && !userEntry.rejected && !bounty.isTerminated
  const isTerminated = !bounty.isTerminated

  if (!hasAnnounced && !isContributor) {
    return null
  }
  return (
    <>
      <ButtonGhost size="large">
        <BellIcon /> {t('common:buttons.notifyAboutChanges')}
      </ButtonGhost>
      {hasLost && <WithdrawStakeButton bounty={bounty} />}
      {isTerminated && <WithdrawContributionButton bounty={bounty} />}
    </>
  )
})

const ExpiredStageButtons = React.memo(({ bounty, activeMember }: BountyHeaderButtonsProps) => {
  const bountyCreator = bounty.creator
  const isCreator = bountyCreator?.id === activeMember?.id
  if (!isCreator || !bountyCreator) {
    return null
  }

  return <CancelBountyButton bounty={bounty} creator={bountyCreator} />
})
