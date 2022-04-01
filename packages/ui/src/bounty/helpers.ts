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
    title: 'You are a winner',
    text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
  },
  loser: {
    color: Colors.Blue[50],
    title: 'You can withdrawn stake',
    text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
  },
  slashed: {
    color: Colors.Red[50],
    title: 'You are slashed',
    text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
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

    case 'BountyEntryStatusPassed':
      return 'slashed'

    default:
      return 'loser'
  }
}
