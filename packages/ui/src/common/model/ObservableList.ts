import { Observable, OperatorFunction, combineLatest, map, merge, of, pipe, switchMap, take } from 'rxjs'

export const mapObservableList =
  <T, R>(mapFn: (item: T) => Observable<R>): OperatorFunction<T[], R[]> =>
  (list$) =>
    list$.pipe(switchMap((list) => (list.length ? combineLatest(list.map(mapFn)) : of([]))))

export const filterObservableList = <T>(predicate: (item: T) => Observable<unknown>): OperatorFunction<T[], T[]> =>
  pipe(
    mapObservableList((item: T) =>
      predicate(item).pipe(
        take(1),
        map((shouldShow) => [!!shouldShow, item] as const)
      )
    ),
    map((mapped) => mapped.filter(([shouldShow]) => shouldShow).map(([, item]) => item))
  )

export const sortObservableList = <T, S>(
  mapFn: (item: T) => Observable<S>,
  compareFn: (a: S, b: S) => number
): OperatorFunction<T[], T[]> =>
  pipe(
    mapFn &&
      mapObservableList((item: T) =>
        mapFn(item).pipe(
          take(1),
          map((sortParam) => [sortParam, item] as const)
        )
      ),
    map((mapped) => mapped.sort((a, b) => compareFn(a[0], b[0])).map(([, item]) => item)),
    setDefault<T[]>([])
  )

const setDefault =
  <T>(defaultValue: T): OperatorFunction<T, T> =>
  (o$) =>
    merge(of(defaultValue), o$)
