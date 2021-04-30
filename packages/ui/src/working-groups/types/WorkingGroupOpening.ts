import BN from 'bn.js'

import { ApplicationQuestionFieldsFragment, WorkingGroupOpeningFieldsFragment } from '../queries'

type WorkingGroupOpeningType = 'LEADER' | 'REGULAR'
type Status = 'OpeningStatusOpen' | 'OpeningStatusFilled' | 'OpeningStatusCancelled'

export interface WorkingGroupOpening {
  id: string
  expectedEnding: string
  title: string
  shortDescription: string
  description: string
  details: string
  type: WorkingGroupOpeningType
  reward: {
    value: BN
    interval: number
  }
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
