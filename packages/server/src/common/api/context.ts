import { PrismaClient } from '@prisma/client'
import { ExpressContext } from 'apollo-server-express'

import { prisma } from '@/common/prisma'

export interface Context {
  prisma: PrismaClient
  req?: ExpressContext['req']
}

export function createContext({ req }: ExpressContext): Context {
  return { req, prisma }
}
