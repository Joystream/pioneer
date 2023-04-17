import log from 'npmlog'

import { prisma } from '@/common/prisma'

import '@/common/config'
log.level = 'silent'

export const clearDb = async () => {
  type TNames = { name: string }[]
  const tNames = await prisma.$queryRaw<TNames>`SELECT tablename AS name FROM pg_tables WHERE schemaname='public'`
  const tables = tNames.flatMap(({ name }) => (name === '_prisma_migrations' ? [] : `"public"."${name}"`))
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables.join(', ')} CASCADE;`)
}

export const mockRequest = jest.fn()
jest.mock('graphql-request', () => ({
  request: mockRequest,
}))

jest.mock('@/common/queries/__generated__', () => ({
  useFragment: ({ definitions }: any, obj: any) => {
    const propname = `${definitions[0].name.value}Fragment`
    return obj[' $fragmentRefs'][propname]
  },
}))

export const mockSendEmail = jest.fn()
jest.mock('@/common/utils/email', () => ({
  ...jest.requireActual('@/common/utils/email'),
  NO_EMAIL_PROVIDER: false,
  configEmailProvider: () => mockSendEmail,
}))
