import log from 'npmlog'

import '@/common/config'
log.level = 'silent'

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
