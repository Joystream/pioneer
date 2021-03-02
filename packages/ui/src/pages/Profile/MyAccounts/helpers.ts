import { SortKey } from '../../../utils/sortAccounts'

export function setOrder(
  key: SortKey,
  sortBy: SortKey,
  setSortBy: (k: SortKey) => void,
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
