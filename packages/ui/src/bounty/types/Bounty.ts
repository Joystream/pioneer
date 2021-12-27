import BN from 'bn.js'

import { BountyFieldsFragment } from '@/bounty/queries/__generated__/bounty.generated'
import { Member } from '@/memberships/types'

export type BountyPeriod = 'funding' | 'working' | 'judgement' | 'withdrawal' | 'expired'

export type EntrantResult = 'winner' | 'loser' | 'slashed'

export interface Contributor {
  actor: Member
  amount: BN
}

export const isContributor = (actor: BountyActorItem): actor is Contributor => {
  return (actor as Contributor).amount !== undefined
}

export interface Entrant {
  actor: Member
  count: number
}

export const isEntrant = (actor: BountyActorItem): actor is Entrant => {
  return (actor as Entrant).count !== undefined
}

export interface Withdrawn {
  actor: Member
}

export type BountyActorItem = Contributor | Entrant | Withdrawn

export interface Bounty
  extends Omit<
    BountyFieldsFragment,
    'fundingType' | 'contractType' | 'bountycontributionbounty' | 'bountyentrybounty'
  > {
  fundingType: BountyFieldsFragment['fundingType']['__typename']
  contractType: {
    type: BountyFieldsFragment['contractType']['__typename']
    whitelist?: string[] | null
  }
  contributorsId: (string | null | undefined)[] | null
  entries:
    | {
        workerId: string
        works: string[]
      }[]
    | null
}

export const asBounty = (fields: BountyFieldsFragment): Bounty => ({
  ...fields,
  fundingType: fields.fundingType.__typename,
  contractType: {
    type: fields.contractType.__typename,
    whitelist:
      fields.contractType.__typename === 'BountyContractClosed'
        ? fields.contractType?.whitelist?.map((member) => member.id)
        : null,
  },
  contributorsId: fields.bountycontributionbounty?.map((contribution) => contribution.contributorId) || null,
  entries:
    fields.bountyentrybounty?.map((entry) => ({
      workerId: entry.workerId,
      works: entry.works.map((work) => work.id),
    })) || null,
})
