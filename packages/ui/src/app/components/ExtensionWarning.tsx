import React, { useEffect, useState } from 'react'

import { SideNotification } from '@/common/components/page/SideNotification'
import { useOnBoarding } from '@/common/hooks/useOnBoarding'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

type ExtensionNotificationTypes = 'ERROR' | 'OLD_USER'

const notificationTimeouts: Record<ExtensionNotificationTypes, number> = {
  ERROR: 10_000,
  OLD_USER: 4_000,
}

export function ExtensionNotification() {
  const { members } = useMyMemberships()
  const { status } = useOnBoarding()
  const [showNotification, setShowNotification] = useState<ExtensionNotificationTypes | undefined>(undefined)

  useEffect(() => {
    if (status === 'finished') {
      setShowNotification('OLD_USER')
    }
  }, [typeof status])

  useEffect(() => {
    if (!showNotification) {
      return
    }
    const timeout = setTimeout(() => setShowNotification(undefined), notificationTimeouts[showNotification])
    return () => clearTimeout(timeout)
  }, [showNotification])

  if (showNotification === 'OLD_USER') {
    return (
      <SideNotification
        onClick={() => setShowNotification(undefined)}
        title="Welcome back!"
        message={`We've found ${members.length} Joystream memberships associated with accounts in your wallet.`}
        showClose
      />
    )
  }

  return null
}
