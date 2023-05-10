import { Dispatch, createContext, SetStateAction } from 'react'

export const FilesContext = createContext<Dispatch<SetStateAction<Uint8Array[]>>>(() => undefined)
