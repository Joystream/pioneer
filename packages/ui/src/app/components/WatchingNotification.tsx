import React, { useEffect, useState } from 'react'

import { SideNotification } from '@/common/components/page/SideNotification'

type WatchingNotificationTypes = true | false

export function WatchingNotification() {
  const [showNotification, setShowNotification] = useState<WatchingNotificationTypes | undefined>(true)

  if (showNotification === true) {
    return (
      <SideNotification
        onClick={() => setShowNotification(false)}
        title="dddddddd!"
        message={`We've found Joystream memberships associated with accounts in your wallet.`}
        showClose
      />
    )
  }
  
  return null
}
