import React, { useMemo } from 'react'
import { TFunction, useTranslation } from 'react-i18next'

import { PageHeader } from '@/app/components/PageHeader'
import { 
  AnnounceWorkEntryButton,
  ClaimRewardButton,
  ContributeFundsButton,
  SubmitWorkButton,
  WithdrawStakeButton,
  WithdrawWorkEntryButton
} from '@/bounty/components/modalsButtons'
import { Bounty, isBountyEntryStatusWinner, isFundingLimited, WorkEntry } from '@/bounty/types/Bounty'
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
  t: TFunction
}

const FundingStageButtons = ({ bounty, t }: BountyHeaderButtonsProps) => {
  const shouldDisplayStatistics = !isFundingLimited(bounty.fundingType) && bounty?.contractType !== 'ContractOpen'

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
      <ContributeFundsButton bounty={bounty} />
    </>
  )
}

const WorkingStageButtons = ({ bounty, activeMember, t }: BountyHeaderButtonsProps) => {
  const userEntry = useMemo(() => bounty.entries?.find((entry) => entry.worker.id === activeMember?.id), [bounty])
  const hasAnnounced = !!userEntry
  const hasSubmitted = hasAnnounced && userEntry.hasSubmitted
  const isOnWhitelist = useMemo(
    () =>
      bounty.contractType !== 'ContractOpen' && bounty.contractType?.whitelist.some((id) => activeMember?.id === id),
    [bounty]
  )

  if (bounty?.contractType !== 'ContractOpen' && !isOnWhitelist) {
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
}

const JudgingStageButtons = ({ bounty, activeMember, t }: BountyHeaderButtonsProps) => {
  const isOracle = bounty.oracle?.id === activeMember?.id

  return (
    <>
      {/* TODO: https://github.com/Joystream/pioneer/issues/1937 */}
      <ButtonGhost size="large">
        <BellIcon /> {t('common:buttons.notifyAboutChanges')}
      </ButtonGhost>
      {/* TODO: https://github.com/Joystream/pioneer/issues/1938 */}
      {isOracle && <ButtonPrimary size="large">{t('buttons.submitJudgement')}</ButtonPrimary>}
    </>
  )
}

const getReward = (entry: WorkEntry) => {
  isBountyEntryStatusWinner(entry.status) ? entry.status.reward : undefined
}


const SuccessfulStageButtons = ({ bounty, activeMember, t }: BountyHeaderButtonsProps) => {
  const userEntry = useMemo(() => bounty.entries?.find((entry) => entry.worker.id === activeMember?.id), [bounty])
  const entryId = userEntry?.id
  const reward = userEntry ? getReward(userEntry) : undefined
  const { winner, passed } =
    useMemo(() => bounty.entries?.find((entry) => entry.worker.id === activeMember?.id), [bounty]) || {}
  const winnerConditions = winner && entryId && reward
  const isContributor = useMemo(
    () => bounty.contributors?.some((contributor) => contributor.actor?.id === activeMember?.id),
    [bounty]
  )

  return (
    <>
      <ButtonGhost size="large">
        <BellIcon /> {t('common:buttons.notifyAboutChanges')}
      </ButtonGhost>
      {(winnerConditions) && <ClaimRewardButton bountyId={bounty.id} entryId={entryId} reward={reward} />}
      {(passed || isContributor) && <WithdrawStakeButton bounty={bounty} lost />}
    </>
  )
}

const FailedStageButtons = ({ bounty, activeMember, t }: BountyHeaderButtonsProps) => {
  const isContributor = useMemo(
    () => bounty.contributors?.some((contributor) => contributor.actor?.id === activeMember?.id),
    [bounty]
  )

  const userEntry = useMemo(() => bounty.entries?.find((entry) => entry.worker.id === activeMember?.id), [bounty])
  const hasAnnounced = !!userEntry
  const hasSubmitted = hasAnnounced && userEntry.hasSubmitted
  const hasLost = hasSubmitted && !userEntry.winner

  if (!hasAnnounced && !isContributor) {
    return null
  }

  return (
    <>
      <ButtonGhost size="large">
        <BellIcon /> {t('common:buttons.notifyAboutChanges')}
      </ButtonGhost>
      {hasSubmitted && <WithdrawStakeButton bounty={bounty} lost={hasLost} />}
    </>
  )
}

const ExpiredStageButtons = ({ bounty, activeMember, t }: BountyHeaderButtonsProps) => {
  const isCreator = bounty.creator?.id === activeMember?.id

  if (!isCreator) {
    return null
  }

  return <ButtonPrimary size="large">{t('buttons.cancelBounty')}</ButtonPrimary>
}
