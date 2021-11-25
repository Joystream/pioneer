import { WorkingGroupOpeningType } from '@/common/api/queries'
import { WorkerStatus, WorkerStatusToTypename, WorkingGroupOpeningStatusTypename } from '@/working-groups/types'

export const getWorkersWhere = (status?: WorkerStatus) => {
  if (!status) {
    return {}
  }

  return { status_json: { isTypeOf_eq: WorkerStatusToTypename[status] } }
}

export type OpeningType = 'open' | 'past'

export type OpeningPositionType = 'LEADER' | 'REGULAR' | undefined

const StatusOpen = WorkingGroupOpeningStatusTypename['open']

export const getOpeningsWhere = (type: OpeningType) => {
  const status = type === 'open' ? { isTypeOf_eq: StatusOpen } : { isTypeOf_not: StatusOpen }
  return { status_json: status }
}

export const getOpeningsPositionType = (openingsPositionType: OpeningPositionType) => {
  switch (openingsPositionType) {
    case 'LEADER':
      return { type_eq: WorkingGroupOpeningType.Leader }
    case 'REGULAR':
      return { type_eq: WorkingGroupOpeningType.Regular }
    default:
      return null
  }
}
