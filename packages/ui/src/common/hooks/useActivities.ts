import BN from 'bn.js'
import { useMemo } from 'react'

import { Activity } from '../types'

export const useActivities = (): Activity[] =>
  useMemo(
    () => [
      {
        id: '1',
        createdAt: '2021-03-09T10:28:04.155Z',
        eventType: 'AppliedOnOpeningEvent',
        membership: {
          handle: 'xXproGamerDarknessXx',
          id: '1',
        },
        opening: {
          title: 'Forum Worker',
          id: '2',
        },
      },
      {
        id: '2',
        createdAt: '2021-05-09T10:28:04.155Z',
        eventType: 'ApplicationWithdrawnEvent',
        membership: {
          handle: 'andy00',
          id: '1',
        },
        opening: {
          title: 'Forum Worker',
          id: '2',
        },
      },
      {
        id: '3',
        createdAt: '2021-05-19T10:28:04.155Z',
        eventType: 'BudgetSpendingEvent',
        amount: new BN('10000'),
        groupName: 'Forum',
      },
      {
        id: '4',
        createdAt: '2021-05-20T10:28:04.155Z',
        eventType: 'BudgetSetEvent',
        groupName: 'Forum',
        newBudget: new BN(100000),
      },
    ],
    []
  )
