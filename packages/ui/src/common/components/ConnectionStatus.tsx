import React, { useCallback, useEffect, useState } from 'react'

import { useApi } from '@/api/hooks/useApi'

import { SideNotification } from './page/SideNotification'

const HIDE_NOTIFICATION_TIMEOUT = 5000

export const ConnectionStatus = () => {
  const { api, connectionState } = useApi()
  const [showNotification, setShowNotification] = useState(true)
  const show = useCallback(() => setShowNotification(true), [])
  const hide = useCallback(() => setShowNotification(false), [])

  const onDisconnected = useCallback(() => {
    show()
  }, [api])

  useEffect(() => {
    api?.once('disconnected', onDisconnected)

    return () => {
      api?.off('disconnected', onDisconnected)
    }
  }, [api])

  useEffect(() => {
    if (!showNotification || connectionState === 'connecting') {
      return
    }

    const timeout = setTimeout(hide, HIDE_NOTIFICATION_TIMEOUT)

    return () => clearTimeout(timeout)
  }, [showNotification, connectionState])

  if (!showNotification || connectionState === 'connecting' || connectionState === 'connected') {
    return null
  }

  return <SideNotification isError showClose onClick={hide} title="Disconnected from Joystream node" />
}
