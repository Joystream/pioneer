import { useCallback, useState } from 'react'

export type BaseSortKey = `${string}_ASC` | `${string}_DESC`

export type OrderKey<OrderBy extends BaseSortKey> = Extract<OrderBy, BaseSortKey> extends
  | `${infer KEY}_ASC`
  | `${infer KEY}_DESC`
  ? KEY
  : never

export interface SortOrder<T> {
  orderKey: T
  isDescending: boolean
}

export function getSortFromEnum<T extends BaseSortKey>(order: SortOrder<OrderKey<T>>) {
  const value = order.isDescending ? `${order.orderKey}_DESC` : `${order.orderKey}_ASC`

  return value as T
}

export const useSort = <Order extends BaseSortKey>(defaultKey: OrderKey<Order>) => {
  const [order, setOrder] = useState<SortOrder<OrderKey<Order>>>({ orderKey: defaultKey, isDescending: true })
  const sort = useCallback(
    (sortKey: OrderKey<Order>) => {
      setOrder({ orderKey: sortKey, isDescending: sortKey === order.orderKey ? !order.isDescending : true })
    },
    [order.orderKey, order.isDescending]
  )

  return {
    order,
    getSortProps: (key: OrderKey<Order>) => ({
      isActive: key === order.orderKey,
      isDescending: order.isDescending,
      onSort: () => sort(key),
    }),
  }
}
