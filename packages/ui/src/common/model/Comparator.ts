import BN from 'bn.js'

export const applyOrder = (order: number, isDescending: boolean) => order * (isDescending ? -1 : 1)

export const Comparator = <T>(isDescending: boolean, key: keyof T) => ({
  string: (itemA: T, itemB: T) => {
    const a = (itemA[key] as unknown as string) || ''
    const b = (itemB[key] as unknown as string) || ''
    return applyOrder(a.localeCompare(b), isDescending)
  },
  bigNumber: (itemA: T, itemB: T) => {
    const a = (itemA[key] as unknown as BN) || new BN(0)
    const b = (itemB[key] as unknown as BN) || new BN(0)
    return applyOrder(a.cmp(b), isDescending)
  },
  number: (itemA: T, itemB: T) => {
    const a = (itemA[key] as unknown as number) || 0
    const b = (itemB[key] as unknown as number) || 0
    return applyOrder(a - b, isDescending)
  },
})
