export const mockRequest = jest.fn()
jest.mock('graphql-request', () => ({
  request: mockRequest,
}))

jest.mock('../src/common/queries/__generated__', () => ({
  useFragment: ({ definitions }: any, obj: any) => {
    const propname = `${definitions[0].name.value}Fragment`
    return obj[' $fragmentRefs'][propname]
  },
}))
