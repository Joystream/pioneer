import { createType } from '@joystream/types'
import { renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { ApiContext } from '@/common/providers/api/context'
import { useIsCouncilMember } from '@/memberships/hooks/useIsCouncilMember'
import { Member } from '@/memberships/types'

import { getMember } from '../../_mocks/members'
import { stubApi, stubQuery } from '../../_mocks/transactions'

describe('useIsCouncilMember', () => {
  const api = stubApi()
  stubQuery(api, 'council.councilMembers', [{ membership_id: createType('u64', 0) }])
  const alice = getMember('alice')
  const bob = getMember('bob')

  it('No member provided', () => {
    const { result } = render()
    expect(result.current).toBeUndefined()
  })

  it('Member is council member', () => {
    const { result } = render(alice)
    expect(result.current).toBeTruthy()
  })

  it('Member is not council member', () => {
    const { result } = render(bob)
    expect(result.current).toStrictEqual(false)
  })

  const render = (member?: Member) => {
    return renderHook(() => useIsCouncilMember(member), {
      wrapper: ({ children }) => <ApiContext.Provider value={api}>{children}</ApiContext.Provider>,
    })
  }
})
