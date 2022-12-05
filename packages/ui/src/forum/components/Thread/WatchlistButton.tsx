import React, { useCallback } from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { WatchIcon } from '@/common/components/icons'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { FORUM_WATCHLIST } from '@/forum/constant'

interface Props {
  threadId: string
}

export const WatchlistButton = ({ threadId }: Props) => {
  const [watchlist, setWatchlist] = useLocalStorage<string[]>(FORUM_WATCHLIST)
  const addToWatchlist = useCallback(
    (e) => {
      e.stopPropagation()
      setWatchlist((watchlist = []) => [...watchlist, threadId])
    },
    [watchlist]
  )
  const removeFromWatchlist = useCallback(
    (e) => {
      e.preventDefault()
      setWatchlist((watchlist = []) => watchlist.filter((id) => id !== threadId))
    },
    [watchlist]
  )

  const isOnWatchlist = watchlist?.includes(threadId)

  if (isOnWatchlist) {
    return (
      <ButtonGhost size="medium" onClick={removeFromWatchlist}>
        <WatchIcon />
        Remove from watchlist
      </ButtonGhost>
    )
  }

  return (
    <ButtonGhost size="medium" onClick={addToWatchlist}>
      <WatchIcon />
      Watch thread
    </ButtonGhost>
  )
}
