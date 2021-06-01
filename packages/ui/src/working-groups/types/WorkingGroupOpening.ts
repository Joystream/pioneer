import BN from 'bn.js'

import { asBlock, Block } from '@/common/types'
import { asMember, Member } from '@/memberships/types'

import { getReward } from '../model/getReward'
import {
  ApplicationQuestionFieldsFragment,
  UpcomingWorkingGroupOpeningFieldsFragment,
  WorkingGroupOpeningFieldsFragment,
} from '../queries'

import { Reward } from './Reward'

type WorkingGroupOpeningType = 'LEADER' | 'REGULAR'
type Status = 'OpeningStatusUpcoming' | 'OpeningStatusOpen' | 'OpeningStatusFilled' | 'OpeningStatusCancelled'

export interface BaseOpening {
  id: string
  groupId: string
  groupName: string
  expectedEnding: string
  title: string
  shortDescription: string
  description: string
  details: string
  createdAtBlock: Block
  stake: BN
  budget: number
  reward: Reward
}

export interface UpcomingWorkingGroupOpening extends BaseOpening {
  hiringLimit: number
  expectedStart: string
}

export interface WorkingGroupOpening extends BaseOpening {
  leaderId?: string | null
  budget: number
  type: WorkingGroupOpeningType
  status: Status
  applications: {
    member: Member
    status: string
  }[]
  applicants: {
    current: number
    total: number
  }
  hiring: {
    current: number
    total: number
  }
}

export const isUpcomingOpening = (opening: BaseOpening): opening is UpcomingWorkingGroupOpening =>
  'hiringLimit' in opening

const asBaseOpening = (fields: UpcomingWorkingGroupOpeningFieldsFragment | WorkingGroupOpeningFieldsFragment) => ({
  id: fields.id,
  title: `${fields.group.name} Working Group`,
  groupId: fields.groupId,
  groupName: fields.group.name,
  budget: fields.group.budget,
  createdAtBlock: asBlock(fields.createdAtBlock),
  reward: getReward(fields.rewardPerBlock, fields.group.name),
  expectedEnding: fields.metadata.expectedEnding,
  shortDescription: fields.metadata.shortDescription || '',
  description: fields.metadata?.description ?? '',
  details: fields.metadata?.applicationDetails ?? '',
  stake: new BN(fields.stakeAmount),
})

export const asUpcomingWorkingGroupOpening = (
  fields: UpcomingWorkingGroupOpeningFieldsFragment
): UpcomingWorkingGroupOpening => ({
  ...asBaseOpening(fields),
  hiringLimit: fields.metadata?.hiringLimit ?? 0,
  expectedStart: fields.expectedStart,
})

export const asWorkingGroupOpening = (fields: WorkingGroupOpeningFieldsFragment): WorkingGroupOpening => ({
  ...asBaseOpening(fields),
  title: `${fields.group.name.toLocaleLowerCase()} Working Group ${fields.type.toLocaleLowerCase()}`,
  type: fields.type as WorkingGroupOpeningType,
  status: fields.status.__typename,
  leaderId: fields.group.leaderId,
  applications: fields.applications.length
    ? fields.applications.map((application) => ({
        member: asMember(application.applicant),
        status: application.status.__typename,
      }))
    : [],
  applicants: {
    current: 0,
    total: fields.applications?.length || 0,
  },
  hiring: {
    current: 0,
    total: fields.metadata?.hiringLimit ?? 0,
  },
})

export type ApplicationQuestionType = 'TEXT' | 'TEXTAREA'

export interface ApplicationQuestion {
  index: number
  type: ApplicationQuestionType
  question: string
}

export const asApplicationQuestion = (opening: ApplicationQuestionFieldsFragment): ApplicationQuestion => {
  return {
    index: opening.index,
    type: opening.type,
    question: opening?.question ?? '',
  }
}
