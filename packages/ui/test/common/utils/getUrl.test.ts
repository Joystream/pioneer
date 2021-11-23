import { MembersRoutes, ProfileRoutes } from '@/app/constants/routes'
import { getUrl } from '@/common/utils/getUrl'
import { ElectionRoutes } from '@/council/constants'

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

  it('Link to a specific module', () => {
    expect(getUrl({ route: ProfileRoutes.profile })).toEqual('https://pioneer.com/#/profile')
  })

  it('Link to a module with an ID', () => {
    expect(getUrl({ route: MembersRoutes.members, params: { id: '2' } })).toEqual('https://pioneer.com/#/members/2')
  })

  it('Link to a module with query parameters', () => {
    expect(getUrl({ route: ElectionRoutes.currentElection, query: { candidate: '12' } })).toEqual(
      'https://pioneer.com/#/election?candidate=12'
    )
    expect(getUrl({ route: ElectionRoutes.currentElection, query: { candidate: '12', otherParam: '13' } })).toEqual(
      'https://pioneer.com/#/election?candidate=12&otherParam=13'
    )
  })

  it('Empty query parameters', () => {
    expect(getUrl({ route: ElectionRoutes.currentElection, query: {} })).toEqual('https://pioneer.com/#/election')
  })

  it('Link with every kind of parameters', () => {
    expect(
      getUrl({
        route: MembersRoutes.members,
        params: { id: '1' },
        query: { paramOne: '12', paramTwo: '13', paramThree: '14' },
      })
    ).toEqual('https://pioneer.com/#/members/1?paramOne=12&paramTwo=13&paramThree=14')
  })

  describe('With a more complex path before the hash', () => {
    it('With path', () => {
      windowSpy.mockImplementation(() => ({
        location: new URL('https://pioneer.com/app/index.php#/domain/1?query=12'),
      }))
      expect(
        getUrl({
          route: MembersRoutes.members,
          params: { id: '1' },
          query: { paramOne: '12', paramTwo: '13', paramThree: '14' },
        })
      ).toEqual('https://pioneer.com/app/index.php#/members/1?paramOne=12&paramTwo=13&paramThree=14')
    })

    it('With path and search', () => {
      windowSpy.mockImplementation(() => ({
        location: new URL('https://pioneer.com/app/index.php?foo=bar&id=11#/domain/1?query=12'),
      }))
      expect(
        getUrl({
          route: MembersRoutes.members,
          params: { id: '1' },
          query: { paramOne: '12', paramTwo: '13', paramThree: '14' },
        })
      ).toEqual('https://pioneer.com/app/index.php?foo=bar&id=11#/members/1?paramOne=12&paramTwo=13&paramThree=14')
    })
  })
})
