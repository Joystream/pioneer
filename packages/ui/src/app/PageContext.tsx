import { createContext, Dispatch, SetStateAction } from 'react'

interface PageContext {
  showWatchingNotification: boolean
  setShowWatchingNotification: Dispatch<SetStateAction<boolean>>
  notiTitleStr: string
  setNotiTitleStr: Dispatch<SetStateAction<string>>
  notiMesageStr: string
  setNotiMesageStr: Dispatch<SetStateAction<string>>
}

export const PageContext = createContext<PageContext>({
  showWatchingNotification: false,
  setShowWatchingNotification: () => {
    return true
  },
  notiMesageStr: '',
  setNotiMesageStr: () => {
    return ''
  },
  notiTitleStr: '',
  setNotiTitleStr: () => {
    return ''
  },
})
