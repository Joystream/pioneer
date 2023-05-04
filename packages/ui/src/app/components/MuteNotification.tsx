import React, { useState } from 'react'

import { SideNotification } from '@/common/components/page/SideNotification'

type MuteNotificationTypes = true | false
type MuteNotificationProps = {
  title: string
  message: string
}

export function MuteNotification({ title, message }: MuteNotificationProps) {
  const [showNotification, setShowNotification] = useState<MuteNotificationTypes | undefined>(true)

  if (showNotification === true) {
    return <SideNotification onClick={() => setShowNotification(false)} title={title} message={message} showClose />
  }

  return null
}
