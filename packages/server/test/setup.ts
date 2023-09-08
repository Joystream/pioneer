import { prisma } from '@/common/prisma'
import { EmailProvider } from '@/common/utils/email'

process.env.APP_SECRET_KEY = 'foo'
process.env.APP_LOG_LEVEL = 'silent'

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

class MockEmailProvider implements EmailProvider {
  sentEmails: any[] = []
  shouldFail = false

  sendEmail = async (email: any) => {
    if (this.shouldFail) {
      throw new Error('MockEmailProvider sendEmail failed')
    }
    this.sentEmails.push(email)
  }

  reset = () => {
    this.sentEmails = []
    this.shouldFail = false
  }
}
export const mockEmailProvider = new MockEmailProvider()
jest.mock('@/common/utils/email', () => ({
  ...jest.requireActual('@/common/utils/email'),
  createEmailProvider: () => mockEmailProvider,
}))
