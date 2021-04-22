import BN from 'bn.js'

import { WorkingGroupOpeningFieldsFragment } from '../queries'

type WorkingGroupOpeningType = 'LEADER' | 'REGULAR'
type Status = 'OpeningStatusOpen' | 'OpeningStatusFilled' | 'OpeningStatusCancelled'

export interface WorkingGroupOpening {
  id: string
  expectedEnding: string
  title: string
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
    total: fields.metadata.hiringLimit,
  },
  title: fields.metadata.shortDescription,
  status: fields.status.__typename,
})
