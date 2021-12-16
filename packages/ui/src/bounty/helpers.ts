import { BountyPeriod } from '@/bounty/types/Bounty'
import { Colors } from '@/common/constants'

export const BountyPeriodColorMapper: Record<BountyPeriod, string> = {
  funding: Colors.Orange[500],
  working: Colors.Blue[500],
  judgement: Colors.Purple[200],
  withdrawal: Colors.Green[500],
  expired: Colors.Red[300],
}
