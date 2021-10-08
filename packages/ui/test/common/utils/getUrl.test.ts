import { getUrl } from '@/common/utils/getUrl'

let windowSpy: jest.SpyInstance
const mockLocation = new URL('https://pioneer.com/#/domain/1?query=12')

describe('getUrl', () => {
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get')
    windowSpy.mockImplementation(() => ({
      location: mockLocation,
    }))
  })

  afterEach(() => {
    windowSpy.mockRestore()
  })

  it('Current page url', () => {
    expect(getUrl('CurrentPage')).toEqual('https://pioneer.com/#/domain/1?query=12')
  })

  it('Link to a specific module', () => {
    expect(getUrl({ page: 'MyProfile' })).toEqual('https://pioneer.com/#/profile')
  })

  it('Link to a module with an ID', () => {
    expect(getUrl({ page: 'Members', id: '2' })).toEqual('https://pioneer.com/#/members/2')
  })

  it('Link to a module with query parameters', () => {
    expect(getUrl({ page: 'Election', query: { candidate: '12' } })).toEqual(
      'https://pioneer.com/#/council/election?candidate=12'
    )
    expect(getUrl({ page: 'Election', query: { candidate: '12', otherParam: '13' } })).toEqual(
      'https://pioneer.com/#/council/election?candidate=12&otherParam=13'
    )
  })

  it('Link with every kind of parameters', () => {
    expect(getUrl({ page: 'Members', id: '1', query: { paramOne: '12', paramTwo: '13', paramThree: '14' } })).toEqual(
      'https://pioneer.com/#/members/1?paramOne=12&paramTwo=13&paramThree=14'
    )
  })
})
