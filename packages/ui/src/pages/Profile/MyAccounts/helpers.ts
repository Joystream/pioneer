import { sortKey } from '../../../utils/sortAccounts'

export function setOrder(
  key: sortKey,
  sortBy: sortKey,
  setSortBy: (k: sortKey) => void,
  reversed: boolean,
  setReversed: (r: boolean) => void
) {
  if (key === sortBy) {
    setReversed(!reversed)
  } else {
    setReversed(false)
    setSortBy(key)
  }
}
