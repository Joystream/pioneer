import { PrismaClient } from '@prisma/client'

let _prisma: PrismaClient
export const prisma = getPrisma()

function getPrisma() {
  if (!_prisma) _prisma = new PrismaClient()
  return _prisma
}
