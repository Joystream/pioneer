import {
  BountyEntryStatus,
  BountyPeriod,
  BountyPeriodFilters,
  EntrantResult,
  FundingType,
  isFundingLimited,
} from '@/bounty/types/Bounty'
import { Colors } from '@/common/constants'

export const BountyPeriodColorMapper: Record<BountyPeriod, string> = {
  funding: Colors.Orange[500],
  working: Colors.Blue[500],
  judgement: Colors.Purple[200],
  successful: Colors.Green[500],
  failed: Colors.Red[300],
  expired: Colors.Red[300],
  terminated: Colors.Red[500],
}

interface InfoboxFields {
  color: string
  title: string
  text: string
}

export const entrantResultMapper: Record<EntrantResult, InfoboxFields> = {
  winner: {
    color: Colors.Green[50],
    title: 'You won the bounty!',
    text: 'Oracle judgement chose your work as winning. You can now recover your stake and claim reward!',
  },
  loser: {
    color: Colors.Blue[50],
    title: 'Your submission did not win.',
    text: 'You can withdraw your stake now and try next time!',
  },
  slashed: {
    color: Colors.Red[50],
    title: 'You got slashed!',
    text: 'Your stake is now burned.',
  },
}

export const bountyPeriods: BountyPeriodFilters[] = [
  'funding',
  'working',
  'judgement',
  'expired',
  'Terminated - failed',
  'Terminated - successful',
  'Terminated - funding',
]

export const sortingOptions = ['Latest', 'Earliest']

export const getFundingPeriodLength = (funding: FundingType) => {
  if (isFundingLimited(funding)) {
    return funding.maxPeriod
  }
}

export const statusToEntrantResult = (status: BountyEntryStatus): EntrantResult => {
  switch (status) {
    case 'BountyEntryStatusWinner':
      return 'winner'

    case 'BountyEntryStatusRejected':
      return 'slashed'

    default:
      return 'loser'
  }
}

export const getSecondsPast = (createdAt: string) => (new Date().getTime() - new Date(createdAt).getTime()) / 1000
