import { urlParamToWorkingGroupName } from '@/working-groups/model/workingGroupName'

describe('urlParamToWorkingGroupName()', () => {
  it('forum', () => {
    expect(urlParamToWorkingGroupName('forum')).toBe('forumWorkingGroup')
  })

  it('content-directory', () => {
    expect(urlParamToWorkingGroupName('content-directory')).toBe('contentDirectoryWorkingGroup')
  })

  it('some-future-group-name', () => {
    expect(urlParamToWorkingGroupName('some-future-group-name')).toBe('someFutureGroupNameWorkingGroup')
  })
})
