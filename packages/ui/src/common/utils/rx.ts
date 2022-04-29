import { filter, first, MonoTypeOperatorFunction, Observable } from 'rxjs'

export const firstWhere =
  <T>(predicate: (value: T, index: number) => boolean): MonoTypeOperatorFunction<T> =>
  (source: Observable<T>) =>
    source.pipe(filter(predicate), first())
