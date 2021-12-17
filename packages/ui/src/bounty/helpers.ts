import { BountyPeriod, EntrantResult } from '@/bounty/types/Bounty'
import { Colors } from '@/common/constants'

export const BountyPeriodColorMapper: Record<BountyPeriod, string> = {
  funding: Colors.Orange[500],
  working: Colors.Blue[500],
  judgement: Colors.Purple[200],
  withdrawal: Colors.Green[500],
  expired: Colors.Red[300],
}

export const entrantResultColorMapper: Record<EntrantResult, string> = {
  winner: Colors.Green[50],
  loser: Colors.Blue[50],
  slashed: Colors.Red[50],
}
