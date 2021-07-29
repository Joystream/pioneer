export enum OpeningStatuses {
  UPCOMING = 'OpeningStatusUpcoming',
  OPEN = 'OpeningStatusOpen',
  FILLED = 'OpeningStatusFilled',
  CANCELLED = 'OpeningStatusCancelled',
}

type MappedStatusesIndex = { [k in OpeningStatuses]?: string }

export const MappedStatuses: MappedStatusesIndex = {
  OpeningStatusUpcoming: 'Upcoming Opening',
  OpeningStatusOpen: 'Opening',
  OpeningStatusFilled: 'Filled Opening',
  OpeningStatusCancelled: 'Closed Opening',
}
