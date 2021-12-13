import { BountyPeriod } from '@/bounty/types/Bounty'
import { Colors } from '@/common/constants'

export const BountyPeriodColorMapper: Record<BountyPeriod, string> = {
  funding: Colors.Orange[500],
  working: Colors.Blue[500],
  judgment: Colors.LogoPurple[500],
  withdrawal: Colors.Green[500],
  expired: Colors.Red[300],
}
