import React, { useMemo } from 'react'
import { TFunction, useTranslation } from 'react-i18next'

import { PageHeader } from '@/app/components/PageHeader'
import { SubmitWorkButton } from '@/bounty/components/SubmitWorkButton/SubmitWorkButton'
import { WithdrawStakeButtonButton } from '@/bounty/components/WithdrawStakeButton/WithdrawStakeButton'
import { WithdrawStakeModal } from '@/bounty/modals/WithdrawalStakeModal'
import { Bounty, isFundingLimited } from '@/bounty/types/Bounty'
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
      <ButtonPrimary size="large">{t('common:buttons.contribute')}</ButtonPrimary>
    </>
  )
}

const WorkingStageButtons = ({ bounty, activeMember, t }: BountyHeaderButtonsProps) => {
  const userEntry = useMemo(() => bounty.entries?.find((entry) => entry.worker.id === activeMember?.id), [bounty])
  const hasAnnounced = !!userEntry
  const hasSubmitted = hasAnnounced && userEntry.hasSubmitted
  const hasLost = hasSubmitted && !userEntry.winner //
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
      {!hasAnnounced && <ButtonPrimary size="large">{t('buttons.announceEntry')}</ButtonPrimary>}
      {hasAnnounced && <SubmitWorkButton bounty={bounty} />}
      {hasSubmitted && <WithdrawStakeButtonButton statusLost={hasLost} bounty={bounty} />}
    </>
  )
}

const JudgingStageButtons = ({ bounty, activeMember, t }: BountyHeaderButtonsProps) => {
  const isOracle = bounty.oracle?.id === activeMember?.id

  return (
    <>
      <ButtonGhost size="large">
        <BellIcon /> {t('common:buttons.notifyAboutChanges')}
      </ButtonGhost>
      {isOracle && <ButtonPrimary size="large">{t('buttons.submitJudgement')}</ButtonPrimary>}
    </>
  )
}

const SuccessfulStageButtons = ({ bounty, activeMember, t }: BountyHeaderButtonsProps) => {
  const { winner, passed } =
    useMemo(() => bounty.entries?.find((entry) => entry.worker.id === activeMember?.id), [bounty]) || {}
  const isContributor = useMemo(
    () => bounty.contributors?.some((contributor) => contributor.actor?.id === activeMember?.id),
    [bounty]
  )

  return (
    <>
      <ButtonGhost size="large">
        <BellIcon /> {t('common:buttons.notifyAboutChanges')}
      </ButtonGhost>
      {winner && <ButtonGhost size="large">{t('common:buttons.claimReward')}</ButtonGhost>}
      {(passed || isContributor) && <ButtonGhost size="large">{t('common:buttons.withdrawStake')}</ButtonGhost>}
    </>
  )
}

const FailedStageButtons = ({ bounty, activeMember, t }: BountyHeaderButtonsProps) => {
  const isWorker = useMemo(() => bounty.entries?.some((entry) => entry.worker.id === activeMember?.id), [bounty])
  const isContributor = useMemo(
    () => bounty.contributors?.some((contributor) => contributor.actor?.id === activeMember?.id),
    [bounty]
  )

  if (!isWorker && !isContributor) {
    return null
  }

  return (
    <>
      <ButtonGhost size="large">
        <BellIcon /> {t('common:buttons.notifyAboutChanges')}
      </ButtonGhost>
      <ButtonGhost size="large">{t('common:buttons.withdrawStake')}</ButtonGhost>
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
