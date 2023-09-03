import { prisma } from '@/common/prisma'
import { GetForumCategoryDocument, GetNotificationEventsDocument, GetThreadDocument } from '@/common/queries'
import { run } from '@/notifier'

import { createMember } from './_mocks/notifier/createMember'
import { postAddedEvent, threadCreatedEvent } from './_mocks/notifier/events'
import { electionAnnouncingEvent, electionRevealingEvent, electionVotingEvent } from './_mocks/notifier/events/election'
import { clearDb, mockRequest, mockSendEmail } from './setup'

describe('Notifier', () => {
  beforeEach(async () => {
    await clearDb()
    mockRequest.mockReset()
    mockSendEmail.mockReset()
  })

  describe('forum', () => {
    it('PostAddedEvent', async () => {
      // -------------------
      // Initialize database
      // -------------------

      // - Alice is using the default behavior for general subscriptions
      // - Alice should be notified of any new post in the category "baz" or it's sub categories
      const alice = await createMember(1, 'alice', [{ kind: 'FORUM_CATEGORY_ENTITY_POST', entityId: 'baz' }])

      // - By default Bob should be notified of any new post
      // - Bob should not be notified of new post on the thread "foo" or the category "qux"
      // - Bob should be notified of new post on the thread "bar" as FORUM_THREAD_ENTITY_POST rather than FORUM_POST_ALL
      const bob = await createMember(2, 'bob', [
        { kind: 'FORUM_POST_ALL' },
        { kind: 'FORUM_THREAD_ENTITY_POST', entityId: 'foo', shouldNotify: false },
        { kind: 'FORUM_THREAD_ENTITY_POST', entityId: 'bar' },
        { kind: 'FORUM_CATEGORY_ENTITY_POST', entityId: 'qux', shouldNotify: false },
      ])

      // Charlie had not registered in the back-end he should not get any notification
      const charlie = { id: 3 }

      // -------------------
      // Mock QN responses
      // -------------------

      mockRequest
        .mockReturnValueOnce({
          events: [
            postAddedEvent(1, {
              thread: 'foo',
              threadAuthor: alice.id,
              text: `Hi [@Bob](#mention?member-id=${bob.id})`,
            }),
            postAddedEvent(2, { thread: 'bar', text: `Hi [@Alice](#mention?member-id=${alice.id})` }),
            postAddedEvent(3, { category: 'baz', threadAuthor: charlie.id }),
            postAddedEvent(4, {
              category: 'qux',
              author: alice.id,
              text: `I [@Alice](#mention?member-id=${alice.id})`,
            }),
          ],
        })
        .mockReturnValue({
          events: [],
          forumCategoryByUniqueInput: { parentId: null },
          forumPostByUniqueInput: {
            author: { handle: 'author:handle' },
            thread: { id: 'thread:id', title: 'thread:title' },
            text: 'Lorem Ipsum',
          },
        })

      // -------------------
      // Run
      // -------------------

      await run()

      // -------------------
      // Check notifications
      // -------------------

      const notifications = await prisma.notification.findMany()

      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: 'event:1',
          memberId: alice.id,
          kind: 'FORUM_THREAD_CREATOR',
          entityId: 'post:1',
          isRead: false,
          isSent: true,
        })
      )
      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: 'event:2',
          memberId: alice.id,
          kind: 'FORUM_POST_MENTION',
          isSent: true,
        })
      )
      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: 'event:2',
          memberId: bob.id,
          kind: 'FORUM_THREAD_ENTITY_POST',
          isSent: true,
        })
      )
      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: 'event:3',
          memberId: alice.id,
          kind: 'FORUM_CATEGORY_ENTITY_POST',
          isSent: true,
        })
      )
      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: 'event:3',
          memberId: bob.id,
          kind: 'FORUM_POST_ALL',
          isSent: true,
        })
      )
      expect(notifications).toHaveLength(5)

      // -------------------
      // Check emails
      // -------------------

      expect(mockSendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: alice.email,
          subject: expect.stringContaining('thread:title'),
          html: expect.stringMatching(/\/#\/forum\/thread\/thread:id\?post=post:1/s),
        })
      )
      expect(mockSendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: alice.email,
          subject: expect.stringContaining('thread:title'),
          html: expect.stringMatching(/\/#\/forum\/thread\/thread:id\?post=post:2/s),
        })
      )
      expect(mockSendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: bob.email,
          subject: expect.stringContaining('thread:title'),
          html: expect.stringMatching(/\/#\/forum\/thread\/thread:id\?post=post:2/s),
        })
      )
      expect(mockSendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: alice.email,
          subject: expect.stringContaining('thread:title'),
          html: expect.stringMatching(/\/#\/forum\/thread\/thread:id\?post=post:3/s),
        })
      )
      expect(mockSendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: bob.email,
          subject: expect.stringContaining('thread:title'),
          html: expect.stringMatching(/\/#\/forum\/thread\/thread:id\?post=post:3/s),
        })
      )
      expect(mockSendEmail).toHaveBeenCalledTimes(5)
    })

    it('ThreadCreatedEvent', async () => {
      // -------------------
      // Initialize database
      // -------------------

      // - Alice is using the default behavior for general subscriptions
      // - Alice should get notified of any new thread in bar or it's sub categories
      const alice = await createMember(1, 'alice', [{ kind: 'FORUM_CATEGORY_ENTITY_THREAD', entityId: 'bar' }])

      // - By default Bob should be notified of any new thread
      // - Bob should not be notified of threads created in category foo or it's sub categories (bar)
      const bob = await createMember(2, 'bob', [
        { kind: 'FORUM_THREAD_ALL' },
        { kind: 'FORUM_CATEGORY_ENTITY_THREAD', entityId: 'foo', shouldNotify: false },
      ])

      // -------------------
      // Mock QN responses
      // -------------------

      mockRequest
        .mockReturnValueOnce({
          events: [
            threadCreatedEvent(1, {
              category: 'foo',
              text: `Hi [@Alice](#mention?member-id=${alice.id}) and [@Bob](#mention?member-id=${bob.id})`,
            }),
            threadCreatedEvent(2, { text: `Hi [@Bob](#mention?member-id=${bob.id})`, category: 'bar' }),
            threadCreatedEvent(3, { author: alice.id, text: `I [@Alice](#mention?member-id=${alice.id})` }),
          ],
        })
        .mockImplementation((_: string, doc: any, variables: any) => {
          switch (doc) {
            case GetNotificationEventsDocument:
              return { events: [] }
            case GetForumCategoryDocument:
              return { forumCategoryByUniqueInput: { parentId: variables.id === 'bar' ? 'foo' : null } }
            case GetThreadDocument:
              return {
                forumThreadByUniqueInput: {
                  author: { handle: 'author:handle' },
                  title: `${variables.id}:title`,
                  initialPost: { text: 'Lorem Ipsum' },
                },
              }
          }
        })

      // -------------------
      // Run
      // -------------------

      await run()

      // -------------------
      // Check notifications
      // -------------------

      const notifications = await prisma.notification.findMany()

      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: 'event:1',
          memberId: alice.id,
          kind: 'FORUM_THREAD_MENTION',
          entityId: 'thread:1',
        })
      )
      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: 'event:2',
          memberId: alice.id,
          kind: 'FORUM_CATEGORY_ENTITY_THREAD',
          entityId: 'thread:2',
        })
      )
      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: 'event:3',
          memberId: bob.id,
          kind: 'FORUM_THREAD_ALL',
          entityId: 'thread:3',
        })
      )
      expect(notifications).toHaveLength(3)

      // -------------------
      // Check emails
      // -------------------

      expect(mockSendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: alice.email,
          subject: expect.stringContaining('thread:1:title'),
          html: expect.stringMatching(/\/#\/forum\/thread\/thread:1/s),
        })
      )
      expect(mockSendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: alice.email,
          subject: expect.stringContaining('thread:2:title'),
          html: expect.stringMatching(/\/#\/forum\/thread\/thread:2/s),
        })
      )
      expect(mockSendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: bob.email,
          subject: expect.stringContaining('thread:3:title'),
          html: expect.stringMatching(/\/#\/forum\/thread\/thread:3/s),
        })
      )
      expect(mockSendEmail).toHaveBeenCalledTimes(3)
    })
  })

  describe('election', () => {
    it('ElectionAnnouncingStartedEvent', async () => {
      // -------------------
      // Initialize database
      // -------------------

      // - Alice is using the default behavior for general subscriptions
      // - Alice should be notified of any election changes
      const alice = await createMember(1, 'alice', [
        { kind: 'ELECTION_ANNOUNCING_STARTED' },
        { kind: 'ELECTION_VOTING_STARTED' },
        { kind: 'ELECTION_REVEALING_STARTED' },
      ])

      // - Bob should not be notified of any election changes
      await createMember(2, 'bob', [{ kind: 'FORUM_POST_ALL' }])

      // -------------------
      // Mock QN responses
      // -------------------

      const announcingId = 'announcing:id'
      const votingId = 'voting:id'
      const revealingId = 'revealing:id'

      mockRequest
        .mockReturnValueOnce({
          events: [
            electionAnnouncingEvent(announcingId),
            electionVotingEvent(votingId),
            electionRevealingEvent(revealingId),
          ],
        })
        .mockReturnValue({
          events: [],
        })

      // -------------------
      // Run
      // -------------------

      await run()

      // -------------------
      // Check notifications
      // -------------------

      const notifications = await prisma.notification.findMany()

      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: announcingId,
          memberId: alice.id,
          kind: 'ELECTION_ANNOUNCING_STARTED',
          isRead: false,
          isSent: true,
        })
      )
      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: votingId,
          memberId: alice.id,
          kind: 'ELECTION_VOTING_STARTED',
          isSent: true,
        })
      )
      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: revealingId,
          memberId: alice.id,
          kind: 'ELECTION_REVEALING_STARTED',
          isSent: true,
        })
      )
      expect(notifications).toHaveLength(3)

      // -------------------
      // Check emails
      // -------------------

      expect(mockSendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: alice.email,
          subject: expect.stringContaining('election started'),
          html: expect.stringMatching(/\/#\/election/s),
        })
      )
      expect(mockSendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: alice.email,
          subject: expect.stringContaining('voting started'),
          html: expect.stringMatching(/\/#\/election/s),
        })
      )
      expect(mockSendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: alice.email,
          subject: expect.stringContaining('revealing period started'),
          html: expect.stringMatching(/\/#\/election/s),
        })
      )
      expect(mockSendEmail).toHaveBeenCalledTimes(3)
    })
  })
})
