import { act, fireEvent, render } from '@testing-library/react'
import React from 'react'

import { WatchlistButton } from '@/forum/components/Thread/WatchlistButton'
import { FORUM_WATCHLIST } from '@/forum/constant'

import { getButton } from '../../_helpers/getButton'

describe('UI: WatchlistButton', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('Create a watchlist', async () => {
    renderComponent()
    const button = await getButton('Watch thread')
    act(() => {
      fireEvent.click(button)
    })
    const watchlist = window.localStorage.getItem(FORUM_WATCHLIST)
    expect(JSON.parse(watchlist!)).toEqual(['1'])
  })

  it('Add to watchlist', async () => {
    window.localStorage.setItem(FORUM_WATCHLIST, JSON.stringify(['2']))
    renderComponent()
    const button = await getButton('Watch thread')
    act(() => {
      fireEvent.click(button)
    })
    const watchlist = window.localStorage.getItem(FORUM_WATCHLIST)
    expect(JSON.parse(watchlist!)).toEqual(['2', '1'])
  })

  it('Remove thread', async () => {
    renderComponent()
    await act(async () => {
      fireEvent.click(await getButton('Watch thread'))
      fireEvent.click(await getButton('Remove from watchlist'))
    })
    const watchlist = window.localStorage.getItem(FORUM_WATCHLIST)
    expect(JSON.parse(watchlist!)).toEqual([])
  })

  const renderComponent = () => render(<WatchlistButton threadId="1" />)
})
