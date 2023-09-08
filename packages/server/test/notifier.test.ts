import { EMAIL_MAX_RETRY_COUNT } from '@/common/config'
import { prisma } from '@/common/prisma'
import { GetForumCategoryDocument, GetNotificationEventsDocument, GetThreadDocument } from '@/common/queries'
import { run } from '@/notifier'

import { createMember } from './_mocks/notifier/createMember'
import { postAddedEvent, threadCreatedEvent } from './_mocks/notifier/events'
import { electionAnnouncingEvent, electionRevealingEvent, electionVotingEvent } from './_mocks/notifier/events/election'
import { clearDb, mockRequest, mockEmailProvider } from './setup'

describe('Notifier', () => {
  beforeEach(async () => {
    await clearDb()
    mockRequest.mockReset()
    mockEmailProvider.reset()
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
          status: 'SENT',
          retryCount: 0,
        })
      )
      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: 'event:2',
          memberId: alice.id,
          kind: 'FORUM_POST_MENTION',
          status: 'SENT',
          retryCount: 0,
        })
      )
      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: 'event:2',
          memberId: bob.id,
          kind: 'FORUM_THREAD_ENTITY_POST',
          status: 'SENT',
          retryCount: 0,
        })
      )
      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: 'event:3',
          memberId: alice.id,
          kind: 'FORUM_CATEGORY_ENTITY_POST',
          status: 'SENT',
          retryCount: 0,
        })
      )
      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: 'event:3',
          memberId: bob.id,
          kind: 'FORUM_POST_ALL',
          status: 'SENT',
          retryCount: 0,
        })
      )
      expect(notifications).toHaveLength(5)

      // -------------------
      // Check emails
      // -------------------

      expect(mockEmailProvider.sentEmails).toContainEqual(
        expect.objectContaining({
          to: alice.email,
          subject: expect.stringContaining('thread:title'),
          html: expect.stringMatching(/\/#\/forum\/thread\/thread:id\?post=post:1/s),
        })
      )
      expect(mockEmailProvider.sentEmails).toContainEqual(
        expect.objectContaining({
          to: alice.email,
          subject: expect.stringContaining('thread:title'),
          html: expect.stringMatching(/\/#\/forum\/thread\/thread:id\?post=post:2/s),
        })
      )
      expect(mockEmailProvider.sentEmails).toContainEqual(
        expect.objectContaining({
          to: bob.email,
          subject: expect.stringContaining('thread:title'),
          html: expect.stringMatching(/\/#\/forum\/thread\/thread:id\?post=post:2/s),
        })
      )
      expect(mockEmailProvider.sentEmails).toContainEqual(
        expect.objectContaining({
          to: alice.email,
          subject: expect.stringContaining('thread:title'),
          html: expect.stringMatching(/\/#\/forum\/thread\/thread:id\?post=post:3/s),
        })
      )
      expect(mockEmailProvider.sentEmails).toContainEqual(
        expect.objectContaining({
          to: bob.email,
          subject: expect.stringContaining('thread:title'),
          html: expect.stringMatching(/\/#\/forum\/thread\/thread:id\?post=post:3/s),
        })
      )
      expect(mockEmailProvider.sentEmails.length).toBe(5)
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

      expect(mockEmailProvider.sentEmails).toContainEqual(
        expect.objectContaining({
          to: alice.email,
          subject: expect.stringContaining('thread:1:title'),
          html: expect.stringMatching(/\/#\/forum\/thread\/thread:1/s),
        })
      )
      expect(mockEmailProvider.sentEmails).toContainEqual(
        expect.objectContaining({
          to: alice.email,
          subject: expect.stringContaining('thread:2:title'),
          html: expect.stringMatching(/\/#\/forum\/thread\/thread:2/s),
        })
      )
      expect(mockEmailProvider.sentEmails).toContainEqual(
        expect.objectContaining({
          to: bob.email,
          subject: expect.stringContaining('thread:3:title'),
          html: expect.stringMatching(/\/#\/forum\/thread\/thread:3/s),
        })
      )
      expect(mockEmailProvider.sentEmails.length).toBe(3)
    })
  })

  describe('election', () => {
    it('ElectionAnnouncingStartedEvent', async () => {
      // -------------------
      // Initialize database
      // -------------------

      // - Alice is using the default behavior for general subscriptions
      // - Alice should be notified of any election changes
      const alice = await createMember(1, 'alice')

      // - Bob should not be notified of any election changes
      await createMember(2, 'bob', [{ kind: 'ELECTION_ANNOUNCING_STARTED', shouldNotify: false }])

      // -------------------
      // Mock QN responses
      // -------------------

      const announcingId = 'announcing:id'

      mockRequest
        .mockReturnValueOnce({
          events: [electionAnnouncingEvent(announcingId)],
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
          status: 'SENT',
          retryCount: 0,
        })
      )
      expect(notifications).toHaveLength(1)

      // -------------------
      // Check emails
      // -------------------

      expect(mockEmailProvider.sentEmails).toContainEqual(
        expect.objectContaining({
          to: alice.email,
          subject: expect.stringContaining('election started'),
          html: expect.stringMatching(/\/#\/election/s),
        })
      )
      expect(mockEmailProvider.sentEmails.length).toBe(1)
    })

    it('ElectionVotingStartedEvent', async () => {
      // -------------------
      // Initialize database
      // -------------------

      // - Alice is using the default behavior for general subscriptions
      // - Alice should be notified of any election changes
      const alice = await createMember(1, 'alice')

      // - Bob should not be notified of any election changes
      await createMember(2, 'bob', [{ kind: 'ELECTION_VOTING_STARTED', shouldNotify: false }])

      // -------------------
      // Mock QN responses
      // -------------------

      const votingId = 'voting:id'

      mockRequest
        .mockReturnValueOnce({
          events: [electionVotingEvent(votingId)],
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
          eventId: votingId,
          memberId: alice.id,
          kind: 'ELECTION_VOTING_STARTED',
          status: 'SENT',
          retryCount: 0,
        })
      )
      expect(notifications).toHaveLength(1)

      // -------------------
      // Check emails
      // -------------------

      expect(mockEmailProvider.sentEmails).toContainEqual(
        expect.objectContaining({
          to: alice.email,
          subject: expect.stringContaining('voting started'),
          html: expect.stringMatching(/\/#\/election/s),
        })
      )
      expect(mockEmailProvider.sentEmails.length).toBe(1)
    })

    it('ElectionRevealingStartedEvent', async () => {
      // -------------------
      // Initialize database
      // -------------------

      // - Alice is using the default behavior for general subscriptions
      // - Alice should be notified of any election changes
      const alice = await createMember(1, 'alice')

      // - Bob should not be notified of any election changes
      await createMember(2, 'bob', [{ kind: 'ELECTION_REVEALING_STARTED', shouldNotify: false }])

      // -------------------
      // Mock QN responses
      // -------------------

      const revealingId = 'revealing:id'

      mockRequest
        .mockReturnValueOnce({
          events: [electionRevealingEvent(revealingId)],
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
          eventId: revealingId,
          memberId: alice.id,
          kind: 'ELECTION_REVEALING_STARTED',
          status: 'SENT',
          retryCount: 0,
        })
      )
      expect(notifications).toHaveLength(1)

      // -------------------
      // Check emails
      // -------------------

      expect(mockEmailProvider.sentEmails).toContainEqual(
        expect.objectContaining({
          to: alice.email,
          subject: expect.stringContaining('revealing period started'),
          html: expect.stringMatching(/\/#\/election/s),
        })
      )
      expect(mockEmailProvider.sentEmails.length).toBe(1)
    })
  })

  describe('retries', () => {
    it('should retry failed notifications', async () => {
      // -------------------
      // Initialize database
      // -------------------

      const alice = await createMember(1, 'alice', [{ kind: 'FORUM_POST_MENTION' }])

      // -------------------
      // Mock QN responses
      // -------------------

      mockRequest
        .mockReturnValueOnce({
          events: [
            postAddedEvent(1, {
              thread: 'foo',
              threadAuthor: 'foo',
              text: `Hi [@Alice](#mention?member-id=${alice.id})`,
            }),
          ],
        })
        .mockReturnValue({
          events: [],
        })

      // Enable email provider fails
      mockEmailProvider.shouldFail = true

      // Run `run()` MAX_EMAIL_RETRY_COUNT times

      for (let i = 0; i < EMAIL_MAX_RETRY_COUNT; i++) {
        await run()

        // -------------------
        // Check notifications
        // -------------------

        const notifications = await prisma.notification.findMany()

        expect(notifications).toContainEqual(
          expect.objectContaining({
            eventId: 'event:1',
            memberId: alice.id,
            kind: 'FORUM_POST_MENTION',
            status: 'PENDING',
            retryCount: i + 1,
          })
        )
        expect(notifications).toHaveLength(1)
      }

      // Expect the notification to be marked as failed after retries are exhausted

      await run()

      const notifications = await prisma.notification.findMany()

      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: 'event:1',
          memberId: alice.id,
          kind: 'FORUM_POST_MENTION',
          status: 'FAILED',
          retryCount: EMAIL_MAX_RETRY_COUNT,
        })
      )

      // Make sure no emails were sent

      expect(mockEmailProvider.sentEmails.length).toBe(0)
    })

    it('should properly send retried notifications', async () => {
      // -------------------
      // Initialize database
      // -------------------

      const alice = await createMember(1, 'alice', [{ kind: 'FORUM_POST_MENTION' }])

      // -------------------
      // Mock QN responses
      // -------------------

      mockRequest
        .mockReturnValueOnce({
          events: [
            postAddedEvent(1, {
              thread: 'foo',
              threadAuthor: 'foo',
              text: `Hi [@Alice](#mention?member-id=${alice.id})`,
            }),
          ],
        })
        .mockReturnValue({
          events: [],
          forumPostByUniqueInput: {
            author: { handle: 'author:handle' },
            thread: { id: 'thread:id', title: 'thread:title' },
            text: 'Lorem Ipsum',
          },
        })

      // Enable email provider fails
      mockEmailProvider.shouldFail = true

      await run()

      // -------------------
      // Check notifications
      // -------------------

      let notifications = await prisma.notification.findMany()

      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: 'event:1',
          memberId: alice.id,
          kind: 'FORUM_POST_MENTION',
          status: 'PENDING',
          retryCount: 1,
        })
      )
      expect(notifications).toHaveLength(1)

      // Disable email provider fails
      mockEmailProvider.shouldFail = false

      // Expect the notification to be sent
      await run()

      notifications = await prisma.notification.findMany()

      expect(notifications).toContainEqual(
        expect.objectContaining({
          eventId: 'event:1',
          memberId: alice.id,
          kind: 'FORUM_POST_MENTION',
          status: 'SENT',
          retryCount: 1,
        })
      )

      // Check emails

      expect(mockEmailProvider.sentEmails).toContainEqual(
        expect.objectContaining({
          to: alice.email,
          subject: expect.stringContaining('thread:title'),
          html: expect.stringMatching(/\/#\/forum\/thread\/thread:id\?post=post:1/s),
        })
      )

      expect(mockEmailProvider.sentEmails.length).toBe(1)
    })
  })
})
