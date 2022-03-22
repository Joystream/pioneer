import React, { useMemo } from 'react'

import { PageHeader } from '@/app/components/PageHeader'
import { BountyHeaderStatistics } from '@/bounty/components/BountyPreviewHeader/components/BountyHeaderStatistics'
import { BountyNotifyButton } from '@/bounty/components/BountyPreviewHeader/components/BountyNotifyButton'
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
  statistics: BountyHeaderStatistics,
  notify: BountyNotifyButton,
}

const buttonValidMembersMapper: Record<ButtonTypes, keyof BountyMembershipsStatistics> = {
  announceWorkEntry: 'idsWithoutEntries',
  cancelBounty: 'idAsCreator',
  claimReward: 'idsWithReward',
  contributeFunds: 'allMemberIds',
  submitWork: 'idsWithEntries',
  withdrawEntryStake: 'idsWithLoss',
  withdrawWorkEntry: 'idsWithEntries',
  withdrawContribution: 'idsWithContribution',
  submitJudgement: 'idAsOracle',
  notify: 'allMemberIds',
  statistics: 'allMemberIds',
}

export const getMembershipsStatistics = (membershipsIdArray: string[], bounty?: Bounty) => {
  const extractEntryWorkerId = (entry: WorkEntry) => entry.worker.id

  const membersWithEntries = bounty?.entries?.filter((entry) => membershipsIdArray.includes(entry.worker.id)) ?? []
  const idsWithEntries = membersWithEntries.map(extractEntryWorkerId)
  const idsWithoutEntries = membershipsIdArray.filter((memberId) => !idsWithEntries.includes(memberId))

  const membersWithSubmission = membersWithEntries.filter((entry) => entry.hasSubmitted)
  const membersWithReward = membersWithSubmission.filter((entry) => isBountyEntryStatusWinner(entry.status))
  const membersWithLoss = membersWithSubmission.filter(
    (entry) => entry.passed && entry.status !== 'BountyEntryStatusCashedOut'
  )
  const idsOnWhitelist = membershipsIdArray.filter((memberId) => bounty?.entrantWhitelist?.includes(memberId))

  const idsWithContribution =
    bounty?.contributors
      .filter(
        (contribution) => membershipsIdArray.includes(contribution.actor?.id ?? '-1') && !contribution.hasWithdrawn
      )
      .map((contribution) => contribution.actor?.id ?? '-1') ?? []

  const idAsCreator = membershipsIdArray.filter((memberId) => bounty?.creator?.id === memberId)
  const idAsOracle = membershipsIdArray.filter((memberId) => bounty?.oracle?.id === memberId)

  return {
    idsWithEntries: membersWithEntries.map(extractEntryWorkerId),
    idsWithSubmissions: membersWithSubmission.map(extractEntryWorkerId),
    idsWithReward: membersWithReward.map(extractEntryWorkerId),
    idsWithLoss: membersWithLoss.map(extractEntryWorkerId),
    idsWithoutEntries,
    idsOnWhitelist,
    idsWithContribution,
    idAsCreator,
    idAsOracle,
    allMemberIds: membershipsIdArray,
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
    idsWithoutEntries,
  } = membershipsStatistics

  switch (bounty.stage) {
    case 'funding': {
      const shouldDisplayStatistics = !isFundingLimited(bounty.fundingType) && isDefined(bounty?.entrantWhitelist)
      const isCancelAvailable = bounty.totalFunding.eq(BN_ZERO) && idAsCreator.length

      shouldDisplayStatistics && buttons.push('statistics')
      isCancelAvailable && buttons.push('cancelBounty')
      buttons.push('contributeFunds')
      break
    }
    case 'workSubmission': {
      isDefined(bounty?.entrantWhitelist) && !idsOnWhitelist.length && buttons.push('notify')
      idsWithoutEntries.length && buttons.push('announceWorkEntry')
      idsWithEntries.length && buttons.push('submitWork')
      idsWithSubmissions.length && buttons.push('withdrawWorkEntry')
      break
    }
    case 'judgment': {
      buttons.push('notify')
      idAsOracle.length && buttons.push('submitJudgement')
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
      idAsCreator.length && buttons.push('cancelBounty')
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
  const { members } = useMyMemberships()

  const membershipsIdArray = useMemo(() => members.map((member) => member.id), [members])

  const membershipsBountyStatistics = useMemo(
    () => getMembershipsStatistics(membershipsIdArray, bounty),
    [membershipsIdArray, bounty]
  )

  const compiledButtons = useMemo(() => {
    if (!bounty) {
      return null
    }

    const buttons = bountyHeaderButtonsFactory(bounty, membershipsBountyStatistics)

    return buttons.map((button) => {
      const Component = bountyButtonsMapper[button]

      return (
        <Component
          key={button}
          bounty={bounty}
          validMemberIds={membershipsBountyStatistics[buttonValidMembersMapper[button]]}
        />
      )
    })
  }, [bounty, members])

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
