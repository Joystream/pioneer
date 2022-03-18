import React, { useMemo } from 'react'

import { PageHeader } from '@/app/components/PageHeader'
import {
  BountyHeaderButtonsProps,
  BountyMembershipsStatistics,
  ButtonTypes,
} from '@/bounty/components/BountyPreviewHeader/types'
import {
  AnnounceWorkEntryButton,
  CancelBountyButton,
  ClaimRewardButton,
  ContributeFundsButton,
  SubmitWorkButton,
  WithdrawStakeButton,
  WithdrawWorkEntryButton,
  SubmitJudgementButton,
  WithdrawContributionButton,
} from '@/bounty/components/modalsButtons'
import { Bounty, isBountyEntryStatusWinner, isFundingLimited, WorkEntry } from '@/bounty/types/Bounty'
import { BadgesRow } from '@/common/components/BadgeStatus/BadgesRow'
import { BadgeStatus } from '@/common/components/BadgeStatus/BadgeStatus'
import { BN_ZERO } from '@/common/constants'
import { isDefined } from '@/common/utils'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

const bountyButtonsMapper: Record<
  ButtonTypes,
  React.MemoExoticComponent<(props: BountyHeaderButtonsProps) => React.ReactElement>
> = {
  announceWorkEntry: AnnounceWorkEntryButton,
  cancelBounty: CancelBountyButton,
  claimReward: ClaimRewardButton,
  contributeFunds: ContributeFundsButton,
  submitWork: SubmitWorkButton,
  withdrawWorkEntry: WithdrawWorkEntryButton,
  withdrawEntryStake: WithdrawStakeButton,
  withdrawContribution: WithdrawContributionButton,
  submitJudgement: SubmitJudgementButton,
  statistics: SubmitJudgementButton, // todo
  notify: SubmitJudgementButton, // todo
}

export const getMembershipsStatistics = (bounty?: Bounty, membershipsIdArray: string[]) => {
  const membersWithEntries = bounty?.entries?.filter((entry) => membershipsIdArray.includes(entry.worker.id)) ?? []
  const membersWithSubmission = membersWithEntries.filter((entry) => entry.hasSubmitted)
  const membersWithReward = membersWithSubmission.filter((entry) => isBountyEntryStatusWinner(entry.status))
  const membersWithLoss = membersWithSubmission.filter(
    (entry) => entry.passed && entry.status !== 'BountyEntryStatusCashedOut'
  )
  const idsOnWhitelist = membershipsIdArray.filter((memberId) => bounty?.entrantWhitelist?.includes(memberId))

  const idsWithContribution =
    bounty?.contributors
      .filter((contribution) => membershipsIdArray.includes(contribution.actor?.id ?? '-1'))
      .map((contribution) => contribution.actor?.id) ?? []

  const idAsCreator = membershipsIdArray.find((memberId) => bounty?.creator?.id === memberId)
  const idAsOracle = membershipsIdArray.find((memberId) => bounty?.oracle?.id === memberId)

  const extractEntryWorkerId = (entry: WorkEntry) => entry.worker.id

  return {
    idsWithEntries: membersWithEntries.map(extractEntryWorkerId),
    idsWithSubmissions: membersWithSubmission.map(extractEntryWorkerId),
    idsWithReward: membersWithReward.map(extractEntryWorkerId),
    idsWithLoss: membersWithLoss.map(extractEntryWorkerId),
    idsOnWhitelist,
    idsWithContribution,
    idAsCreator,
    idAsOracle,
  }
}

const bountyHeaderButtonsFactory = (bounty: Bounty, membershipsStatistics: BountyMembershipsStatistics) => {
  const buttons: (keyof typeof bountyButtonsMapper)[] = []

  const {
    idsWithContribution,
    idAsCreator,
    idsOnWhitelist,
    idsWithLoss,
    idsWithReward,
    idsWithSubmissions,
    idsWithEntries,
    idAsOracle,
  } = membershipsStatistics

  switch (bounty.stage) {
    case 'funding': {
      const shouldDisplayStatistics = !isFundingLimited(bounty.fundingType) && isDefined(bounty?.entrantWhitelist)
      const isCancelAvailable = bounty.totalFunding > BN_ZERO && idAsCreator

      shouldDisplayStatistics && buttons.push('statistics')
      isCancelAvailable && buttons.push('cancelBounty')
      buttons.push('contributeFunds')
      break
    }
    case 'workSubmission': {
      isDefined(bounty?.entrantWhitelist) && !idsOnWhitelist.length && buttons.push('notify')
      !idsWithEntries.length ? buttons.push('announceWorkEntry') : buttons.push('submitWork')
      idsWithSubmissions.length && buttons.push('withdrawWorkEntry')
      break
    }
    case 'judgment': {
      buttons.push('notify')
      idAsOracle && buttons.push('submitJudgement')
      break
    }
    case 'successful': {
      buttons.push('notify')

      idsWithReward.length && buttons.push('claimReward')
      idsWithLoss.length && buttons.push('withdrawEntryStake')
      break
    }
    case 'failed': {
      buttons.push('notify')
      idsWithLoss.length && buttons.push('withdrawEntryStake')
      idsWithContribution.length && buttons.push('withdrawContribution')
      break
    }
    case 'expired': {
      idAsCreator && buttons.push('cancelBounty')
      break
    }
  }

  if (bounty.isTerminated) {
    buttons.length = 0
  }

  return buttons
}

interface Props {
  bounty?: Bounty
  badgeNames?: string[]
}

export const BountyPreviewHeader = React.memo(({ bounty, badgeNames }: Props) => {
  const { active: activeMember, members } = useMyMemberships()

  const membershipsIdArray = useMemo(() => members.map((member) => member.id), [members.length])

  const membershipsBountyStatistics = useMemo(
    () => getMembershipsStatistics(bounty, membershipsIdArray),
    [members.length, bounty]
  )

  const compiledButtons = useMemo(() => {
    if (!bounty) {
      return null
    }

    const buttonsProps: BountyHeaderButtonsProps = { bounty, noActiveMemberCall: () => undefined }

    const buttons = bountyHeaderButtonsFactory(bounty, membershipsBountyStatistics)

    return buttons.map((button) => {
      const Component = bountyButtonsMapper[button]

      return <Component {...buttonsProps} />
    })
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

// const FundingStageButtons = React.memo(({ bounty, t, activeMember }: BountyHeaderButtonsProps) => {
//   const shouldDisplayStatistics = !isFundingLimited(bounty.fundingType) && isDefined(bounty?.entrantWhitelist)
//   const isCancelAvailable = bounty.totalFunding > BN_ZERO && activeMember?.id === bounty.creator?.id
//
//   if (isCancelAvailable && bounty.creator) {
//     return <CancelBountyButton bounty={bounty} creator={bounty.creator} />
//   }
//
//   return (
//     <>
//       {shouldDisplayStatistics && (
//         <>
//           <div>
//             {t('bountyFields.cherry')} {bounty.cherry.toNumber()}
//           </div>
//           <div>
//             {t('bountyFields.entrantStake')} {bounty.entrantStake.toNumber()}
//           </div>
//         </>
//       )}
//       <ContributeFundsButton bounty={bounty} />
//     </>
//   )
// })
//
// const WorkingStageButtons = React.memo(({ bounty, activeMember, t }: BountyHeaderButtonsProps) => {
//   const userEntry = useMemo(() => bounty.entries?.find((entry) => entry.worker.id === activeMember?.id), [bounty])
//   const hasAnnounced = !!userEntry
//   const hasSubmitted = hasAnnounced && userEntry.hasSubmitted
//   const isOnWhitelist = useMemo(() => activeMember && bounty.entrantWhitelist?.includes(activeMember.id), [bounty])
//
//   if (isDefined(bounty?.entrantWhitelist) && !isOnWhitelist) {
//     {
//       /* TODO: https://github.com/Joystream/pioneer/issues/1937 */
//     }
//     return (
//       <ButtonGhost size="large">
//         <BellIcon /> {t('common:buttons.notifyAboutChanges')}
//       </ButtonGhost>
//     )
//   }
//
//   return (
//     <>
//       {!hasAnnounced && <AnnounceWorkEntryButton bounty={bounty} />}
//       {hasAnnounced && <SubmitWorkButton bounty={bounty} />}
//       {hasSubmitted && <WithdrawWorkEntryButton bounty={bounty} entry={userEntry} />}
//     </>
//   )
// })
//
// const JudgingStageButtons = React.memo(({ bounty, activeMember, t }: BountyHeaderButtonsProps) => {
//   const isOracle = bounty.oracle?.id === activeMember?.id
//
//   return (
//     <>
//       <ButtonGhost size="large">
//         <BellIcon /> {t('common:buttons.notifyAboutChanges')}
//       </ButtonGhost>
//       {isOracle && <SubmitJudgementButton bounty={bounty} />}
//     </>
//   )
// })
//
// const getReward = (entry: WorkEntry) => {
//   return isBountyEntryStatusWinner(entry.status) ? new BN(entry.status.reward) : undefined
// }
//
// const SuccessfulStageButtons = React.memo(({ bounty, activeMember, t }: BountyHeaderButtonsProps) => {
//   const userEntry = useMemo(() => bounty.entries?.find((entry) => entry.worker.id === activeMember?.id), [bounty])
//   const entryId = userEntry?.id
//   const reward = userEntry ? getReward(userEntry) : undefined
//   const { winner, passed } =
//     useMemo(() => bounty.entries?.find((entry) => entry.worker.id === activeMember?.id), [bounty]) || {}
//   const winnerConditions = winner && entryId && reward
//   const isContributor = useMemo(
//     () => bounty.contributors?.some((contributor) => contributor.actor?.id === activeMember?.id),
//     [bounty]
//   )
//   return (
//     <>
//       <ButtonGhost size="large">
//         <BellIcon /> {t('common:buttons.notifyAboutChanges')}
//       </ButtonGhost>
//       {winnerConditions && <ClaimRewardButton bountyId={bounty.id} entryId={entryId} reward={reward} />}
//       {(passed || isContributor) && isContributor ? (
//         <WithdrawContributionButton bounty={bounty} />
//       ) : (
//         <WithdrawStakeButton bounty={bounty} />
//       )}
//     </>
//   )
// })
//
// const FailedStageButtons = React.memo(({ bounty, activeMember, t }: BountyHeaderButtonsProps) => {
//   const isContributor = useMemo(
//     () => bounty.contributors?.some((contributor) => contributor.actor?.id === activeMember?.id),
//     [bounty]
//   )
//
//   const userEntry = useMemo(() => bounty.entries?.find((entry) => entry.worker.id === activeMember?.id), [bounty])
//   const hasAnnounced = !!userEntry
//   const hasSubmitted = hasAnnounced && userEntry.hasSubmitted
//   const hasLost = hasSubmitted && !userEntry.winner && !userEntry.rejected && !bounty.isTerminated
//   const isTerminated = !bounty.isTerminated
//
//   if (!hasAnnounced && !isContributor) {
//     return null
//   }
//   return (
//     <>
//       <ButtonGhost size="large">
//         <BellIcon /> {t('common:buttons.notifyAboutChanges')}
//       </ButtonGhost>
//       {hasLost && <WithdrawStakeButton bounty={bounty} />}
//       {isTerminated && <WithdrawContributionButton bounty={bounty} />}
//     </>
//   )
// })
//
// const ExpiredStageButtons = React.memo(({ bounty, activeMember }: BountyHeaderButtonsProps) => {
//   const bountyCreator = bounty.creator
//   const isCreator = bountyCreator?.id === activeMember?.id
//   if (!isCreator || !bountyCreator) {
//     return null
//   }
//
//   return <CancelBountyButton bounty={bounty} creator={bountyCreator} />
// })
