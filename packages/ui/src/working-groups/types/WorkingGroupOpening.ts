import BN from 'bn.js'

import { asMember, Member } from '@/memberships/types'

import { ApplicationQuestionFieldsFragment, WorkingGroupOpeningFieldsFragment } from '../queries'

type WorkingGroupOpeningType = 'LEADER' | 'REGULAR'
type Status = 'OpeningStatusUpcoming' | 'OpeningStatusOpen' | 'OpeningStatusFilled' | 'OpeningStatusCancelled'

export interface WorkingGroupOpening {
  id: string
  groupId: string
  groupName: string
  leaderId?: string | null
  budget: number
  expectedEnding: string
  createdAt: string
  title: string
  shortDescription: string
  description: string
  details: string
  type: WorkingGroupOpeningType
  reward: {
    value: BN
    interval: number
  }
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
  status: Status
  stake: BN
}

export const asWorkingGroupOpening = (fields: WorkingGroupOpeningFieldsFragment): WorkingGroupOpening => ({
  id: fields.id,
  groupId: fields.groupId,
  groupName: fields.group.name,
  leaderId: fields.group.leaderId,
  budget: fields.group.budget,
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
  type: fields.type as WorkingGroupOpeningType,
  reward: {
    value: fields.rewardPerBlock,
    interval: 1,
  },
  expectedEnding: fields.metadata.expectedEnding,
  createdAt: fields.createdAt,
  hiring: {
    current: 0,
    total: fields.metadata?.hiringLimit ?? 0,
  },
  title: fields.metadata?.shortDescription ?? '',
  shortDescription: fields.metadata.shortDescription || '',
  description: fields.metadata?.description ?? '',
  details: fields.metadata?.applicationDetails ?? '',
  status: fields.status.__typename,
  stake: new BN(fields.stakeAmount),
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
