type Predicate<T extends any> = (value: T, index: number, obj: T[]) => boolean

export const takeAfter = <T extends any>(pred: Predicate<T>, list: T[]) => {
  const index = 1 + list.findIndex(pred)
  return index ? list.slice(index) : []
}
export const takeBefore = <T extends any>(pred: Predicate<T>, list: T[]) =>
  takeAfter(pred, [...list].reverse()).reverse()
