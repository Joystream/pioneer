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
        member: {
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
        member: {
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
      {
        id: '5',
        createdAt: '2021-05-23T10:28:04.155Z',
        eventType: 'LeaderSetEvent',
        member: {
          id: '3',
          handle: 'Kyle_1994',
        },
        groupName: 'storage',
      },
      {
        id: '6',
        createdAt: '2021-05-24T10:28:04.155Z',
        eventType: 'StatusTextChangedEvent',
        groupName: 'storage',
      },
      {
        id: '7',
        createdAt: '2021-05-25T10:28:04.155Z',
        eventType: 'OpeningAddedEvent',
        opening: {
          id: '3',
          title: 'Forum Working Group Regular',
        },
      },
      {
        id: '8',
        createdAt: '2021-05-25T10:28:04.155Z',
        eventType: 'OpeningCanceledEvent',
        opening: {
          id: '3',
          title: 'Forum Working Group Regular',
        },
      },
      {
        id: '9',
        createdAt: '2021-05-26T19:28:04.155Z',
        eventType: 'StakeSlashedEvent',
        groupName: 'Forum',
        member: {
          id: '6',
          handle: 'stefan0',
        },
      },
      {
        id: '10',
        createdAt: '2021-05-26T19:28:04.155Z',
        eventType: 'StakeIncreasedEvent',
        member: {
          id: '6',
          handle: 'stefan0',
        },
        amount: new BN(1000),
      },
      {
        id: '11',
        createdAt: '2021-05-26T19:28:04.155Z',
        eventType: 'StakeDecreasedEvent',
        member: {
          id: '6',
          handle: 'stefan0',
        },
        amount: new BN(1000),
      },
    ],
    []
  )
