import React, { useState, useContext, useCallback } from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { WatchIcon } from '@/common/components/icons'
import { PageContext } from '@/app/PageContext'

interface Props {
  threadId: string
}

export const WatchThreadButton = ({ threadId }: Props) => {
  const { showWatchingNotification, setShowWatchingNotification } = useContext(PageContext)
  const toggleExtensionNotification = () => {
    setShowWatchingNotification(!showWatchingNotification)
  }

  const [watching, setWatching] = useState<boolean>(false)
  const toggleWatching = useCallback(
    (e) => {
      e.stopPropagation()
      setWatching((prev) => !prev)
    },
    []
  )

  return (
    <ButtonGhost size="medium" onClick={(e) => { toggleWatching(e); toggleExtensionNotification() }}>
      <WatchIcon />
      {watching ? 'Remove from watchlist' : 'Watch thread'}
    </ButtonGhost>
  )
}
