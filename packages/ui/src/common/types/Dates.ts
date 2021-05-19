interface StartDate {
  start: Date
}
interface EndDate {
  end: Date
}

export type DateRange = StartDate & EndDate
export type PartialDateRange = undefined | StartDate | EndDate | DateRange

export type DateSelection = Date | PartialDateRange
