import { nanoid } from 'nanoid'
import React, { useState } from 'react'

import { NotificationProps } from '@/common/providers/Notification/types'

import { NotificationContext } from './context'

export const NotificationProvier = ({ children }: { children: React.ReactNode }) => {
  const [notiArr, setNotiArr] = useState<NotificationProps[]>([])

  const addNotification = (notification: any): string => {
    const newNoti = { ...notification, key: nanoid() }
    setNotiArr([...notiArr, newNoti])
    return newNoti.key
  }

  const removeNotification = (key: string) => {
    setNotiArr((prevNotiArr) => prevNotiArr.filter((noti) => noti.key !== key))
  }

  return (
    <NotificationContext.Provider value={{ notiArr, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}
