import BN from 'bn.js'
import { useMemo } from 'react'

import { Activity } from '../types'

export const useActivities = (): Activity[] =>
  useMemo(
    () => [
      {
        id: '1',
        createdAt: '2021-03-09T10:28:04.155Z',
        eventType: 'AppliedOnOpening',
        member: {
          handle: 'xXproGamerDarknessXx',
          id: '1',
        },
        opening: {
          title: 'Forum Worker',
          id: '2',
          type: 'REGULAR',
          groupName: 'forum',
        },
      },
      {
        id: '2',
        createdAt: '2021-05-09T10:28:04.155Z',
        eventType: 'ApplicationWithdrawn',
        member: {
          handle: 'andy00',
          id: '1',
        },
        opening: {
          title: 'Forum Worker',
          id: '2',
          type: 'REGULAR',
          groupName: 'forum',
        },
      },
      {
        id: '3',
        createdAt: '2021-05-19T10:28:04.155Z',
        eventType: 'BudgetSpending',
        amount: new BN('10000'),
        groupName: 'Forum',
      },
      {
        id: '4',
        createdAt: '2021-05-20T10:28:04.155Z',
        eventType: 'BudgetSet',
        groupName: 'Forum',
        newBudget: new BN(100000),
      },
      {
        id: '6',
        createdAt: '2021-05-24T10:28:04.155Z',
        eventType: 'StatusTextChanged',
        groupName: 'storage',
      },
      {
        id: '7',
        createdAt: '2021-05-25T10:28:04.155Z',
        eventType: 'OpeningAdded',
        opening: {
          id: '3',
          title: 'Forum Working Group Regular',
          type: 'REGULAR',
          groupName: 'forum',
        },
      },
      {
        id: '8',
        createdAt: '2021-05-25T10:28:04.155Z',
        eventType: 'OpeningCanceled',
        opening: {
          id: '3',
          title: 'Forum Working Group Regular',
          type: 'REGULAR',
          groupName: 'forum',
        },
      },
      {
        id: '9',
        createdAt: '2021-05-26T19:28:04.155Z',
        eventType: 'StakeSlashed',
        groupName: 'Forum',
        member: {
          id: '6',
          handle: 'stefan0',
        },
      },
      {
        id: '10',
        createdAt: '2021-05-26T19:28:04.155Z',
        eventType: 'StakeIncreased',
        member: {
          id: '6',
          handle: 'stefan0',
        },
        amount: new BN(1000),
      },
      {
        id: '11',
        createdAt: '2021-05-26T19:28:04.155Z',
        eventType: 'StakeDecreased',
        member: {
          id: '6',
          handle: 'stefan0',
        },
        amount: new BN(1000),
      },
      {
        id: '12',
        createdAt: '2021-05-26T19:28:04.155Z',
        eventType: 'WorkerExited',
        member: {
          id: '7',
          handle: 'mr_guy',
        },
      },
      {
        id: '13',
        createdAt: '2021-05-25T10:28:04.155Z',
        eventType: 'OpeningAdded',
        opening: {
          id: '3',
          title: 'Forum Working Group Leader',
          type: 'LEADER',
          groupName: 'forum',
        },
      },
      {
        id: '14',
        createdAt: '2021-05-25T10:28:04.155Z',
        eventType: 'OpeningCanceled',
        opening: {
          id: '3',
          title: 'Forum Working Group Leader',
          type: 'LEADER',
          groupName: 'forum',
        },
      },
    ],
    []
  )
