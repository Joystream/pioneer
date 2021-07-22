import React, { useEffect, useState } from 'react'

import { useApi } from '../hooks/useApi'

import { SideNotification } from './page/SideNotification'

const HIDE_NOTIFICATION_TIMEOUT = 5000

export const ConnectionStatus = () => {
  const { api, connectionState } = useApi()
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    if (!api) {
      setShowNotification(true)
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

  if (connectionState === 'connecting') {
    return <SideNotification title="Connecting to node" />
  }

  if (!showNotification) {
    return null
  }

  if (connectionState === 'connected') {
    return <SideNotification showClose onClick={() => setShowNotification(false)} title={'Connected to network'} />
  }

  return (
    <SideNotification
      isError
      showClose
      onClick={() => setShowNotification(false)}
      title={'Disconnected from network'}
    />
  )
}
