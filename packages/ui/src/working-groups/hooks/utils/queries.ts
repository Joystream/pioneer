import { WorkerStatus, WorkerStatusTypename, WorkingGroupOpeningStatusTypename } from '@/working-groups/types'

export const getWorkersWhere = (status?: WorkerStatus) => {
  if (!status) {
    return {}
  }

  return { status_json: { isTypeOf_eq: WorkerStatusTypename[status] } }
}

export type OpeningType = 'open' | 'past'

const StatusOpen = WorkingGroupOpeningStatusTypename['open']

export const getOpeningsWhere = (type: OpeningType) => {
  const status = type === 'open' ? { isTypeOf_eq: StatusOpen } : { isTypeOf_not: StatusOpen }
  return { status_json: status }
}
