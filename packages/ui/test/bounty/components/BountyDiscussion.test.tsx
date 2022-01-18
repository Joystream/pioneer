import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { BountyDiscussion, BountyDiscussionProps } from '@/bounty/components/BountyDiscussion/BountyDiscussion'

import { MockApolloProvider } from '../../_mocks/providers'

describe('UI: BountyDiscussion', () => {
  const props: BountyDiscussionProps = {
    discussionThreadId: '1',
  }

  beforeEach(() => {
    render(
      <MockApolloProvider>
        <MemoryRouter>
          <BountyDiscussion {...props} />
        </MemoryRouter>
      </MockApolloProvider>
    )
  })

  it('Renders component', () => {
    expect(screen.getByTestId('bounty-discussion')).toBeInTheDocument()
  })

  it('Renders correct title', () => {
    expect(screen.getByText('discussionThread.title')).toBeInTheDocument()
  })
})
