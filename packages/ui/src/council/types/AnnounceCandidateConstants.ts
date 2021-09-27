import BN from 'bn.js'

export interface AnnounceCandidateConstants {
  councilSeats: number
  announcingPeriod: number
  votingPeriod: number
  revealingPeriod: number
  candidateStake: BN
}
