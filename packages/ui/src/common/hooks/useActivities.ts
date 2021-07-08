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
          type: 'REGULAR',
          groupName: 'forum',
        },
      },
    ],
    []
  )
