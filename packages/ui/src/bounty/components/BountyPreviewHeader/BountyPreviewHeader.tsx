import React, { useMemo } from 'react'

import { PageHeader } from '@/app/components/PageHeader'
import { BountyHeaderStatistics } from '@/bounty/components/BountyPreviewHeader/components/BountyHeaderStatistics'
import {
  BountyHeaderButtonsProps,
  BountyMembershipsStatistics,
  ButtonTypes,
} from '@/bounty/components/BountyPreviewHeader/types'
import { BountyHeaderButton } from '@/bounty/components/modalsButtons'
import { Bounty, isFundingLimited, WorkEntry } from '@/bounty/types/Bounty'
import { BadgesRow } from '@/common/components/BadgeStatus/BadgesRow'
import { BadgeStatus } from '@/common/components/BadgeStatus/BadgeStatus'
import { BN_ZERO } from '@/common/constants'
import { isDefined } from '@/common/utils'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

const bountyButtonsPropsFactory = (
  type: ButtonTypes
): Omit<BountyHeaderButtonsProps<any>, 'validMemberIds' | 'modalData'> | undefined => {
  switch (type) {
    case 'announceWorkEntry':
      return {
        text: 'buttons.announceEntry',
        modal: 'BountyAnnounceWorkEntryModal',
      }
    case 'cancelBounty':
      return {
        text: 'buttons.cancelBounty',
        modal: 'BountyCancel',
      }
    case 'claimReward':
      return {
        text: 'buttons.claimReward',
        modal: 'ClaimReward',
      }
    case 'contributeFunds':
      return {
        text: 'buttons.contributeFunds',
        modal: 'BountyContributeFundsModal',
      }
    case 'submitWork':
      return {
        text: 'buttons.submitWork',
        modal: 'SubmitWork',
      }
    case 'withdrawWorkEntry':
      return {
        text: 'buttons.withdrawWorkEntry',
        modal: 'BountyWithdrawWorkEntryModal',
      }
    case 'withdrawEntryStake':
      return {
        text: 'buttons.loserWithdrawStake',
        modal: 'WithdrawStakeModal',
      }
    case 'withdrawContribution':
      return {
        text: 'buttons.contributorWithdrawStake',
        modal: 'BountyWithdrawContributionModal',
      }
    case 'submitJudgement':
      return {
        text: 'buttons.submitJudgement',
        modal: 'SubmitJudgementModal',
      }
    default:
      return undefined
  }
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

  const membersWithEntries =
    bounty?.entries?.filter((entry: WorkEntry) => membershipsIdArray.includes(entry.worker.id) && !entry.withdrawn) ??
    []
  const idsWithEntries = membersWithEntries.map(extractEntryWorkerId)
  const idsWithoutEntries = membershipsIdArray
    .filter((memberId) => !idsWithEntries.includes(memberId))
    .filter((memberId) => (bounty?.entrantWhitelist?.length ? bounty.entrantWhitelist.includes(memberId) : true))

  const membersWithSubmission = membersWithEntries.filter((entry) => entry.hasSubmitted)
  const membersWithReward = membersWithSubmission.filter((entry) => entry.winner && !entry.hasCashedOut)
  const membersWithLoss = membersWithEntries.filter((entry) => entry.passed && !entry.hasCashedOut)
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
    idsWithReward: membersWithReward.map(extractEntryWorkerId),
    idsWithLoss: membersWithLoss.map(extractEntryWorkerId),
    idsWithEntries,
    idsWithoutEntries,
    idsOnWhitelist,
    idsWithContribution,
    idAsCreator,
    idAsOracle,
    allMemberIds: membershipsIdArray,
  }
}

const bountyHeaderButtonsFactory = (bounty: Bounty, membershipsStatistics: BountyMembershipsStatistics) => {
  const buttons: ButtonTypes[] = []

  const {
    idsWithContribution,
    idAsCreator,
    idsOnWhitelist,
    idsWithLoss,
    idsWithReward,
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
      idsWithEntries.length && buttons.push('withdrawWorkEntry')
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
    if (!bounty) return null
    const buttonsTypes = bountyHeaderButtonsFactory(bounty, membershipsBountyStatistics)

    return buttonsTypes.map((buttonType) => {
      if (buttonType === 'statistics') {
        return <BountyHeaderStatistics bounty={bounty} />
      }
      const buttonProps = bountyButtonsPropsFactory(buttonType)

      if (!buttonProps) return null

      return (
        <BountyHeaderButton
          {...buttonProps}
          modalData={{ bounty, creator: bounty.creator }}
          key={buttonType}
          validMemberIds={membershipsBountyStatistics[buttonValidMembersMapper[buttonType]]}
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
