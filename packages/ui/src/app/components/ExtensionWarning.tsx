import React, { useEffect, useState } from 'react'

import { useAccounts } from '../../accounts/hooks/useAccounts'
import { SideNotification } from '../../common/components/page/SideNotification'

const HIDE_NOTIFICATION_TIMEOUT = 10000

export function ExtensionWarning() {
  const { error } = useAccounts()
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    if (error === 'EXTENSION') {
      setShowNotification(true)
    }
  }, [error])

  useEffect(() => {
    if (!showNotification) {
      return
    }
    const timeout = setTimeout(() => setShowNotification(false), HIDE_NOTIFICATION_TIMEOUT)
    return () => clearTimeout(timeout)
  }, [showNotification])

  if (showNotification) {
    return (
      <SideNotification
        onClick={() => setShowNotification(false)}
        title={'Extension unavailable'}
        message={'You need a Polkadot.js extension to use this site.'}
        isError
      />
    )
  }

  return null
}
