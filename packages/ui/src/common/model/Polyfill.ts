import { isDefined } from '../utils'

export const toSpliced = <T>(array: T[], start: number, deleteCount?: number, ...items: T[]): T[] => {
  const hasDeleteCount = isDefined(deleteCount)

  if ('toSpliced' in Array.prototype) {
    return hasDeleteCount ? (array as any).toSpliced(start, deleteCount, ...items) : (array as any).toSpliced(start)
  }

  return [...array.slice(0, start), ...items, ...(hasDeleteCount ? array.slice(start + deleteCount) : [])]
}
