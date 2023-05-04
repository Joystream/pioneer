import { createContext, Dispatch, SetStateAction } from 'react'
import { number } from 'yargs'

interface PageContext {
  setNotiArr: Dispatch<SetStateAction<any>>
}

export const PageContext = createContext<PageContext>({
  setNotiArr: () => {
    return []
  },
})
