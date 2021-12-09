import { groupNameToURLParam, urlParamToWorkingGroupId } from '@/working-groups/model/workingGroupName'
import { asWorkingGroupName } from '@/working-groups/types'

describe('urlParamToWorkingGroupId()', () => {
  it('forum', () => {
    expect(urlParamToWorkingGroupId('forum')).toBe('forumWorkingGroup')
  })

  it('content-directory', () => {
    expect(urlParamToWorkingGroupId('content-directory')).toBe('contentDirectoryWorkingGroup')
  })

  it('some-future-group-name', () => {
    expect(urlParamToWorkingGroupId('some-future-group-name')).toBe('someFutureGroupNameWorkingGroup')
  })
})

describe('groupNameToURLParam()', () => {
  it('forum', () => {
    expect(groupNameToURLParam('forum')).toBe('forum')
  })

  it('content directory', () => {
    expect(groupNameToURLParam('content directory')).toBe('content-directory')
  })

  it('Content Directory', () => {
    expect(groupNameToURLParam('Content Directory')).toBe('content-directory')
  })

  it('CONTENT DIRECTORY', () => {
    expect(groupNameToURLParam('CONTENT DIRECTORY')).toBe('content-directory')
  })
})

describe('asWorkingGroupName', () => {
  it('Single word name', () => {
    expect(asWorkingGroupName('forumWorkingGroup')).toBe('Forum')
    expect(asWorkingGroupName('ForumWorkingGroup')).toBe('Forum')
  })

  it('Multiple word name', () => {
    expect(asWorkingGroupName('contentDirectoryWorkingGroup')).toBe('Content Directory')
  })
})
