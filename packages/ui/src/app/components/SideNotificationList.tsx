import React, { useContext, useEffect } from 'react'

import { SideNotification } from '@/common/components/page/SideNotification'
import { NotificationContext } from '@/common/providers/Notification/context'

export function SideNotificationList() {
  const { notiArr, removeNotification } = useContext(NotificationContext)
  const hideNotification = (key: string) => {
    removeNotification(key)
  }

  useEffect(() => {
    const latestNotification = notiArr[notiArr.length - 1]
    if (!latestNotification) {
      return
    }
  }, [notiArr])

  if (notiArr.length) {
    return (
      <>
        {notiArr.map(({ key, title, message }) => (
          <SideNotification key={key} onClick={() => hideNotification(key)} title={title} message={message} showClose />
        ))}
      </>
    )
  }

  return null
}
