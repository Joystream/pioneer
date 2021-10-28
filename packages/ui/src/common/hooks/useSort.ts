import { useCallback, useState } from 'react'

export type BaseSortKey = `${string}_ASC` | `${string}_DESC`

export type OrderKey<OrderBy extends BaseSortKey> = Extract<OrderBy, BaseSortKey> extends
  | `${infer KEY}_ASC`
  | `${infer KEY}_DESC`
  ? KEY
  : never

export interface SortOrder<Order extends BaseSortKey> {
  orderKey: OrderKey<Order>
  isDescending: boolean
}

export function toQueryOrderByInput<Order extends BaseSortKey>(order: SortOrder<Order>) {
  const value = order.isDescending ? `${order.orderKey}_DESC` : `${order.orderKey}_ASC`

  return value as Order
}

export type GetSortProps<Order extends BaseSortKey> = (key: OrderKey<Order>) => {
  onSort: () => void
  isDescending: boolean
  isActive: boolean
}

type UseSortReturn<Order extends BaseSortKey> = { order: SortOrder<Order>; getSortProps: GetSortProps<Order> }

export const useSort = <Order extends BaseSortKey>(defaultKey: OrderKey<Order>): UseSortReturn<Order> => {
  const [order, setOrder] = useState<SortOrder<Order>>({ orderKey: defaultKey, isDescending: true })
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
