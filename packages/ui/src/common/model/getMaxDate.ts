import { addYears, startOfYear } from 'date-fns'

export const getMaxDate = () => {
  return startOfYear(addYears(new Date(), 30))
}
