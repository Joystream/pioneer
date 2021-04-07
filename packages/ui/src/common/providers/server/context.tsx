import { Server } from 'miragejs'
import { createContext } from 'react'

export const ServerContext = createContext<Server | undefined>(undefined)
