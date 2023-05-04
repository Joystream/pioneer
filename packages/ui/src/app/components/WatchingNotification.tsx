import React, { useEffect, useState } from 'react'

import { SideNotification } from '@/common/components/page/SideNotification'

type WatchingNotificationTypes = true | false
export type WatchingNotificationProps = {
  title: string
  message: string
}

export function WatchingNotification({ title, message }: WatchingNotificationProps) {
  const hideNotificationTimeout = 4000
  const [showNotification, setShowNotification] = useState<WatchingNotificationTypes | undefined>(true)

  const hideNotification = () =>{
    setShowNotification(false)
  }

  useEffect(() => {
    if (!showNotification) {
      return
    }
    const timeout = setTimeout(() => hideNotification(), hideNotificationTimeout)
    return () => clearTimeout(timeout)
  }, [showNotification])

  if (showNotification === true) {
    return <SideNotification onClick={() => hideNotification()} title={title} message={message} showClose />
  }

  return null
}
