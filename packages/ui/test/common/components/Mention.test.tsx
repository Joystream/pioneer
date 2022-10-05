import { screen, render, RenderResult } from '@testing-library/react'
import BN from 'bn.js'
import { addSeconds, addYears, format, formatDistanceToNowStrict } from 'date-fns'
import React from 'react'

import { Mention, MentionProps } from '@/common/components/Mention'
import { ApplicationTooltip, ApplicationTooltipProps } from '@/common/components/Mention/ApplicationTooltip'
import { ForumPostTooltip, ForumPostTooltipProps } from '@/common/components/Mention/ForumPostTooltip'
import { ForumThreadTooltip, ForumThreadTooltipProps } from '@/common/components/Mention/ForumThreadTooltip'
import { OpeningTooltip, OpeningTooltipProps } from '@/common/components/Mention/OpeningTooltip'
import { ProposalTooltip, ProposalTooltipProps } from '@/common/components/Mention/ProposalTooltip'
import {
  ProposalDiscussionEntryTooltip,
  ProposalDiscussionEntryTooltipProps,
} from '@/common/components/Mention/PrposalDiscussionEntryTooltip'
import { cutText } from '@/common/helpers'
import { formatTokenValue } from '@/common/model/formatters'
import { Block } from '@/common/types'
import { ForumPostMention, ForumThreadMention } from '@/forum/types'
import { getMember } from '@/mocks/helpers'
import { ProposalDiscussionPostMention, ProposalMention } from '@/proposals/types'
import { WorkingGroupOpeningMention } from '@/working-groups/types'
import { WorkingGroupApplicationMention } from '@/working-groups/types/WorkingGroupApplication'

import { MockApolloProvider } from '../../_mocks/providers'
import { loaderSelector } from '../../setup'

jest.mock('@/proposals/hooks/useBlocksToProposalExecution', () => ({
  useBlocksToProposalExecution: jest.fn().mockReturnValue(1),
}))
jest.mock('@/proposals/hooks/useProposalConstants', () => ({
  useProposalConstants: jest.fn().mockReturnValue({}),
}))
jest.useFakeTimers().setSystemTime(addYears(new Date(), 3).getTime())

const mockBlock: Block = {
  timestamp: '2021-01-01',
  network: 'OLYMPIA',
  number: 12345678,
}

describe('UI: Mention', () => {
  it('should render component', () => {
    const props: Omit<MentionProps, 'children'> = {
      itemId: '1',
      type: 'member',
    }
    const expected = 'test-text'
    render(
      <MockApolloProvider>
        <Mention {...props}>{expected}</Mention>
      </MockApolloProvider>
    )
    expect(screen.getByTestId('mention-container')).toHaveTextContent(expected)
  })

  describe('UI: ApplicationTooltip', () => {
    const onMount = jest.fn()
    const mention: WorkingGroupApplicationMention = {
      id: '1',
      applicant: getMember('alice'),
      createdAtBlock: mockBlock,
      opening: {
        type: 'test-type',
        shortDescription: 'test-short-desc',
        description: 'test-description',
      },
    }
    const props: ApplicationTooltipProps = {
      onMount,
      mention,
    }

    beforeEach(() => {
      jest.clearAllMocks()
      render(<ApplicationTooltip {...props} />)
    })

    it('should render component', () => {
      expect(screen.getByTestId('application-tooltip')).toBeInTheDocument()
    })

    it('should mount loader when no mention was provided', () => {
      render(<ApplicationTooltip {...props} mention={undefined} />)
      expect(loaderSelector()).toBeInTheDocument()
    })

    it('should call onMount when no mention was provided', () => {
      render(<ApplicationTooltip {...props} mention={undefined} />)
      expect(onMount).toHaveBeenCalledTimes(1)
    })

    it('should render correct application date', () => {
      const expected = format(new Date(mention.createdAtBlock.timestamp), 'Pp')
      expect(screen.getByText(`mentions.tooltips.application.appliedOn ${expected}`)).toBeInTheDocument()
    })

    it('should render correct applicant', () => {
      const expected = mention.applicant.handle
      expect(screen.getByText(expected)).toBeInTheDocument()
    })

    it('should render correct opening type', () => {
      const expected = mention.opening.type
      expect(screen.getByText(expected)).toBeInTheDocument()
    })

    it('should render correct opening description', () => {
      const expected = cutText(mention.opening.description as string)
      expect(screen.getByText(expected)).toBeInTheDocument()
    })
  })

  describe('UI: ForumPostTooltip', () => {
    const onMount = jest.fn()
    const mention: ForumPostMention = {
      id: '1',
      text: 'test-text',
      createdAt: '2021-01-01',
      author: getMember('alice'),
    }
    const props: ForumPostTooltipProps = {
      onMount,
      mention,
    }

    beforeEach(() => {
      jest.clearAllMocks()
      render(<ForumPostTooltip {...props} />)
    })

    it('should render component', () => {
      expect(screen.getByTestId('forum-post-tooltip')).toBeInTheDocument()
    })

    it('should mount loader when no mention was provided', () => {
      render(<ForumPostTooltip {...props} mention={undefined} />)
      expect(loaderSelector()).toBeInTheDocument()
    })

    it('should call onMount when no mention was provided', () => {
      render(<ForumPostTooltip {...props} mention={undefined} />)
      expect(onMount).toHaveBeenCalledTimes(1)
    })

    it('should render correct replied date', () => {
      const expected = format(new Date(mention.createdAt), 'Pp')
      expect(screen.getByText(`mentions.tooltips.forumPost.repliedOn ${expected}`)).toBeInTheDocument()
    })

    it('should render correct author', () => {
      const expected = mention.author.handle
      expect(screen.getByText(expected)).toBeInTheDocument()
    })

    it('should render correct text', () => {
      const expected = cutText(mention.text)
      expect(screen.getByText(expected)).toBeInTheDocument()
    })
  })

  describe('UI: ForumThreadTooltip', () => {
    const onMount = jest.fn()
    const mention: ForumThreadMention = {
      id: '1',
      title: 'test-title',
      visiblePostsCount: 8,
      author: getMember('alice'),
      text: 'test-text',
    }
    const props: ForumThreadTooltipProps = {
      onMount,
      mention,
    }

    beforeEach(() => {
      jest.clearAllMocks()
      render(<ForumThreadTooltip {...props} />)
    })

    it('should render component', () => {
      expect(screen.getByTestId('forum-thread-tooltip')).toBeInTheDocument()
    })

    it('should mount loader when no mention was provided', () => {
      render(<ForumThreadTooltip {...props} mention={undefined} />)
      expect(loaderSelector()).toBeInTheDocument()
    })

    it('should call onMount when no mention was provided', () => {
      render(<ForumThreadTooltip {...props} mention={undefined} />)
      expect(onMount).toHaveBeenCalledTimes(1)
    })

    it('should render correct title', () => {
      const expected = mention.title
      expect(screen.getByText(expected)).toBeInTheDocument()
    })

    it('should render correct author', () => {
      const expected = mention.author.handle
      expect(screen.getByText(expected)).toBeInTheDocument()
    })

    it('should render correct description', () => {
      const expected = cutText(mention.text as string)
      expect(screen.getByText(expected)).toBeInTheDocument()
    })

    it('should render correct number of answer', () => {
      const expected = mention.visiblePostsCount - 1
      expect(screen.getByText(expected)).toBeInTheDocument()
    })
  })

  describe('UI: OpeningTooltip', () => {
    let renderResult: RenderResult
    const onMount = jest.fn()
    const mention: WorkingGroupOpeningMention = {
      id: '1',
      type: 'test-type',
      rewardPerBlock: new BN(200),
      applicants: 12,
      shortDescription: 'test-short-desc',
      description: 'test-desc',
      expectedEnding: '2020-01-01',
      hiring: {
        current: 22,
        limit: 33,
      },
    }
    const props: OpeningTooltipProps = {
      onMount,
      mention,
    }

    beforeEach(() => {
      jest.clearAllMocks()
      renderResult = render(<OpeningTooltip {...props} />)
    })

    it('should render component', () => {
      expect(screen.getByTestId('opening-tooltip')).toBeInTheDocument()
    })

    it('should mount loader when no mention was provided', () => {
      render(<OpeningTooltip {...props} mention={undefined} />)
      expect(loaderSelector()).toBeInTheDocument()
    })

    it('should call onMount when no mention was provided', () => {
      render(<OpeningTooltip {...props} mention={undefined} />)
      expect(onMount).toHaveBeenCalledTimes(1)
    })

    it('should render correct distance to the ending date in the past', () => {
      const expected = 'mentions.tooltips.opening.past'
      expect(screen.getByText(expected)).toBeInTheDocument()
    })

    it('should render correct distance to the ending date in the future', () => {
      const futureDate = addYears(new Date(), 3).toISOString()
      renderResult.rerender(<OpeningTooltip {...props} mention={{ ...mention, expectedEnding: futureDate }} />)
      const expected = formatDistanceToNowStrict(new Date(futureDate))
      expect(screen.getByText(`mentions.tooltips.opening.duration ${expected}`)).toBeInTheDocument()
    })

    it('should render correct short description', () => {
      const expected = cutText(mention.shortDescription as string, 20)
      expect(screen.getByText(expected)).toBeInTheDocument()
    })

    it('should render correct type', () => {
      const expected = mention.type
      expect(screen.getByText(expected)).toBeInTheDocument()
    })

    it('should render correct description', () => {
      const expected = cutText(mention.description as string)
      expect(screen.getByText(expected)).toBeInTheDocument()
    })

    it('should render correct reward', () => {
      const expected = formatTokenValue(new BN(mention?.rewardPerBlock).muln(3600))
      expect(screen.getByText(expected)).toBeInTheDocument()
    })

    it('should render correct number of applicants', () => {
      const expected = mention.applicants
      expect(screen.getByText(expected)).toBeInTheDocument()
    })

    it('should render correct number of hired applicants', () => {
      const expected = mention.hiring.current
      expect(screen.getByText(expected)).toBeInTheDocument()
    })

    it('should render correct limit of hired applicants', () => {
      const expected = mention.hiring.limit
      expect(screen.getByText(expected)).toBeInTheDocument()
    })
  })

  describe('UI: ProposalTooltip', () => {
    const onMount = jest.fn()
    const mention: ProposalMention = {
      id: '1',
      title: 'test-title',
      status: 'deciding',
      type: 'signal',
      description: 'test-desc',
      exactExecutionBlock: mockBlock.number,
      statusSetAtBlock: mockBlock,
    }
    const props: ProposalTooltipProps = {
      onMount,
      mention,
    }

    beforeEach(() => {
      jest.clearAllMocks()
      render(<ProposalTooltip {...props} />)
    })

    it('should render component', () => {
      expect(screen.getByTestId('proposal-tooltip')).toBeInTheDocument()
    })

    it('should mount loader when no mention was provided', () => {
      render(<ProposalTooltip {...props} mention={undefined} />)
      expect(loaderSelector()).toBeInTheDocument()
    })

    it('should call onMount when no mention was provided', () => {
      render(<ProposalTooltip {...props} mention={undefined} />)
      expect(onMount).toHaveBeenCalledTimes(1)
    })

    it('should render correct distance to the ending date in the future', () => {
      const date = addSeconds(new Date(), 6)
      const expected = formatDistanceToNowStrict(date)
      expect(screen.getByText(`mentions.tooltips.proposal.timeLeft ${expected}`)).toBeInTheDocument()
    })

    it('should render correct title', () => {
      const expected = cutText(mention.title, 20)
      expect(screen.getByText(expected)).toBeInTheDocument()
    })

    it('should render correct description', () => {
      const expected = cutText(mention.description)
      expect(screen.getByText(expected)).toBeInTheDocument()
    })

    it('should render correct status', () => {
      const expected = mention.status
      expect(screen.getByText(expected)).toBeInTheDocument()
    })
  })

  describe('UI: ProposalDiscussionEntryTooltip', () => {
    const onMount = jest.fn()
    const mention: ProposalDiscussionPostMention = {
      id: '1',
      text: 'test-text',
      author: getMember('alice'),
      createdAt: '2021-01-01',
    }
    const props: ProposalDiscussionEntryTooltipProps = {
      onMount,
      mention,
    }

    beforeEach(() => {
      jest.clearAllMocks()
      render(<ProposalDiscussionEntryTooltip {...props} />)
    })

    it('should render component', () => {
      expect(screen.getByTestId('proposal-discussion-entry-tooltip')).toBeInTheDocument()
    })

    it('should mount loader when no mention was provided', () => {
      render(<ProposalDiscussionEntryTooltip {...props} mention={undefined} />)
      expect(loaderSelector()).toBeInTheDocument()
    })

    it('should call onMount when no mention was provided', () => {
      render(<ProposalDiscussionEntryTooltip {...props} mention={undefined} />)
      expect(onMount).toHaveBeenCalledTimes(1)
    })

    it('should render correct replied date', () => {
      const expected = format(new Date(mention.createdAt), 'Pp')
      expect(screen.getByText(`mentions.tooltips.forumPost.repliedOn ${expected}`)).toBeInTheDocument()
    })

    it('should render correct author', () => {
      const expected = mention.author.handle
      expect(screen.getByText(expected)).toBeInTheDocument()
    })

    it('should render correct text', () => {
      const expected = cutText(mention.text)
      expect(screen.getByText(expected)).toBeInTheDocument()
    })
  })
})
