import { Member, PrismaClient } from '@prisma/client'
import { ExpressContext } from 'apollo-server-express'

import { getAuthenticatedMember } from '@/auth/model/token'
import { prisma } from '@/common/prisma'

export interface Context {
  prisma: PrismaClient
  req?: ExpressContext['req']
  member: Member | null
}

export async function createContext({ req }: ExpressContext): Promise<Context> {
  const member = await getAuthenticatedMember(req)
  return { req, prisma, member }
}
