import React, { useState } from 'react'

import { SideNotification } from '@/common/components/page/SideNotification'

type WatchingNotificationTypes = true | false
type WatchingNotificationProps = {
  title: string
  message: string
}

export function WatchingNotification({ title, message }: WatchingNotificationProps) {
  const [showNotification, setShowNotification] = useState<WatchingNotificationTypes | undefined>(true)

  if (showNotification === true) {
    return <SideNotification onClick={() => setShowNotification(false)} title={title} message={message} showClose />
  }

  return null
}
