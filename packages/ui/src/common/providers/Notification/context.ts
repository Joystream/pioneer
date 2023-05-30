import { createContext } from 'react'

import { NotificationProps } from '@/common/providers/Notification/types'

interface NotificationContext {
  notiArr: NotificationProps[]
  addNotification: (notification: any) => string
  removeNotification: (key: string) => void
}

export const NotificationContext = createContext<NotificationContext>({
  notiArr: [],
  addNotification: () => '',
  removeNotification: () => {
    return null
  },
})

export const notificationTimeout = 4000
