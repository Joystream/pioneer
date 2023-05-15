import { PrismaClient } from '@prisma/client'
import { ExpressContext } from 'apollo-server-express'

import { prisma } from '@/common/prisma'

export interface Context extends Pick<ExpressContext, 'req'> {
  prisma: PrismaClient
}

export function createContext({ req }: ExpressContext): Context {
  return { req, prisma }
}
