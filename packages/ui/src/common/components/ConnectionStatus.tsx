import React, { useEffect, useState } from 'react'

import { useApi } from '../hooks/useApi'
import { SideNotification } from './page/SideNotification'

const HIDE_NOTIFICATION_TIMEOUT = 5000

export const ConnectionStatus = () => {
  const { isConnected, api } = useApi()
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    if (!api) {
      return
    }

    const onConnected = () => {
      api.once('disconnected', onDisconnected)
      setShowNotification(true)
    }

    const onDisconnected = () => {
      api.once('connected', onConnected)
      setShowNotification(true)
    }

    api.once('disconnected', onDisconnected)
    api.once('connected', onConnected)

    return () => {
      api.off('connected', onConnected)
      api.off('disconnected', onDisconnected)
    }
  }, [api])

  useEffect(() => {
    if (!showNotification) {
      return
    }

    const timeout = setTimeout(() => setShowNotification(false), HIDE_NOTIFICATION_TIMEOUT)

    return () => clearTimeout(timeout)
  }, [showNotification])

  if (!showNotification) {
    return null
  }

  if (isConnected) {
    return <SideNotification onClick={() => setShowNotification(false)} title={'Connected to network'} />
  }

  return <SideNotification isError onClick={() => setShowNotification(false)} title={'Disconnected from network'} />
}
