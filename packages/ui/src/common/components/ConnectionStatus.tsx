import React, { useCallback, useEffect, useState } from 'react'

import { useApi } from '../hooks/useApi'

import { SideNotification } from './page/SideNotification'

const HIDE_NOTIFICATION_TIMEOUT = 5000

export const ConnectionStatus = () => {
  const { api, connectionState } = useApi()
  const [showNotification, setShowNotification] = useState(false)
  const show = useCallback(() => setShowNotification(true), [])
  const hide = useCallback(() => setShowNotification(false), [])
  const onConnected = useCallback(() => {
    api?.once('disconnected', onDisconnected)
    show()
  }, [api])
  const onDisconnected = useCallback(() => {
    api?.once('connected', onConnected)
    show()
  }, [api])

  useEffect(() => {
    api?.once('disconnected', onDisconnected)
    api?.once('connected', onConnected)

    return () => {
      api?.off('connected', onConnected)
      api?.off('disconnected', onDisconnected)
    }
  }, [api])

  useEffect(() => {
    if (!showNotification) {
      return
    }

    const timeout = setTimeout(hide, HIDE_NOTIFICATION_TIMEOUT)

    return () => clearTimeout(timeout)
  }, [showNotification])

  if (connectionState === 'connecting') {
    return <SideNotification title="Connecting to node" />
  }

  if (!showNotification) {
    return null
  }

  if (connectionState === 'connected') {
    return <SideNotification showClose onClick={hide} title="Connected to Joystream node" />
  }

  return <SideNotification isError showClose onClick={hide} title="Disconnected from Joystream node" />
}
