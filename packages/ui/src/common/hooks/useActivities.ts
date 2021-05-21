import { Activity } from '../types'

export const useActivities = (): Activity[] => [
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
]
