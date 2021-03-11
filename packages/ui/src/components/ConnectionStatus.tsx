import React, { useEffect, useState } from 'react'
import { useApi } from '../hooks/useApi'
import { SideNotification } from './page/SideNotification'

export const ConnectionStatus = () => {
  const { isConnected, api } = useApi()
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    if (!api) {
      return
    }

    api.on('connected', () => {
      setShowNotification(true)
    })

    api.on('disconnected', () => {
      setShowNotification(true)
    })
  }, [api])

  return (
    <>
      {showNotification &&
        (isConnected ? (
          <SideNotification onClick={() => setShowNotification(false)} title={'Connected to network'} />
        ) : (
          <SideNotification onClick={() => setShowNotification(false)} title={'Disconnected from network'} />
        ))}
    </>
  )
}
