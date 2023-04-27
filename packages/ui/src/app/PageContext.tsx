import { createContext, Dispatch, SetStateAction } from 'react'

interface PageContext {
  showWatchingNotification: boolean
  setShowWatchingNotification: Dispatch<SetStateAction<boolean>>
}

export const PageContext = createContext<PageContext>({
  showWatchingNotification: false,
  setShowWatchingNotification: () => {},
})