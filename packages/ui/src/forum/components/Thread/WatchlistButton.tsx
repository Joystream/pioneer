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
  const addToWatchlist = useCallback(() => setWatchlist(watchlist ? [...watchlist, threadId] : [threadId]), [watchlist])
  const removeFromWatchlist = useCallback(() => setWatchlist(watchlist?.filter((id) => id !== threadId)), [watchlist])

  const isThreadWatchlisted = watchlist?.includes(threadId)

  if (isThreadWatchlisted) {
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
