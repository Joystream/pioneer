import { EMAIL_MAX_RETRY_COUNT } from '@/common/config'
import { prisma } from '@/common/prisma'
import { GetForumCategoryDocument, GetNotificationEventsDocument, GetThreadDocument } from '@/common/queries'
import { run } from '@/notifier'

import { createMember } from './_mocks/notifier/createMember'
import { postAddedEvent, proposalDiscussionPostCreatedEvent, threadCreatedEvent } from './_mocks/notifier/events'
import { electionAnnouncingEvent, electionRevealingEvent, electionVotingEvent } from './_mocks/notifier/events/election'
import { clearDb, mockRequest, mockEmailProvider } from './setup'

describe('Notifier', () => {
  beforeEach(async () => {
    await clearDb()
    mockRequest.mockReset()
    mockEmailProvider.reset()
  })

  describe('forum', () => {
    describe('PostAddedEvent', () => {
      it('Member notifications', async () => {
        // -------------------
        // Initialize database
        // -------------------

        // - Alice is using the default behavior for general subscriptions
        // - Alice should be notified of any new post in the category "baz" or it's sub categories
        const alice = await createMember(1, 'alice', [
          { kind: 'FORUM_THREAD_ENTITY_POST', entityId: 'foo' },
          { kind: 'FORUM_CATEGORY_ENTITY_POST', entityId: 'baz' },
        ])

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

        // Dave is using the default behavior for general subscriptions
        // However he should not get any email notifications
        const dave = await createMember(4, 'dave', undefined, false)

        // -------------------
        // Mock QN responses
        // -------------------

        mockRequest
          .mockReturnValueOnce({ workers: [], electedCouncils: [] })
          .mockReturnValueOnce({
            events: [
              // Mention Bob on a thread created by Alice which she watches and which is muted by Bob
              // (the thread creation takes priority)
              postAddedEvent(1, {
                thread: 'foo',
                threadAuthor: alice.id,
                text: `Hi [@Bob](#mention?member-id=${bob.id})`,
              }),
              // Reply and mention Alice on a thread created by Alice which is watched by Bob
              // (the mention takes priority)
              postAddedEvent(2, {
                thread: 'bar',
                threadAuthor: alice.id,
                text: `Hi [@Alice](#mention?member-id=${alice.id})`,
                repliesTo: alice.id,
              }),
              // Post on a thread created by Charlie which is in a category watched by Alice
              postAddedEvent(3, { category: 'baz', threadAuthor: charlie.id }),
              // Alice replies to and mentions herself in a category muted by Bob
              // (both reply and mention should be ignored)
              postAddedEvent(4, {
                category: 'qux',
                author: alice.id,
                text: `Hi [@Alice](#mention?member-id=${alice.id})`,
                repliesTo: alice.id,
              }),
              // Reply to Alice and mention Dave on a thread created by Alice which she watches and which is muted by Bob
              // (the reply takes priority)
              postAddedEvent(5, {
                thread: 'foo',
                threadAuthor: alice.id,
                text: `Hi [@Dave](#mention?member-id=${dave.id})`,
                repliesTo: alice.id,
              }),
              // Alice post in a thread she created in a category muted by Bob
              // (no notification should be created)
              postAddedEvent(6, {
                author: alice.id,
                threadAuthor: alice.id,
                category: 'qux',
              }),
            ],
          })
          .mockReturnValue({
            events: [],
            forumCategoryByUniqueInput: { parentId: null },
            forumPostByUniqueInput: {
              author: { handle: 'author:handle' },
              thread: { id: 'thread:id', title: 'thread:title' },
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

        // Post 1 is on Alice's thread
        expect(notifications).toContainEqual(
          expect.objectContaining({
            eventId: 'event:1',
            memberId: alice.id,
            kind: 'FORUM_THREAD_CREATOR',
            entityId: 'post:1',
            isRead: false,
            emailStatus: 'SENT',
            retryCount: 0,
          })
        )
        // Post 2 mentions Alice
        expect(notifications).toContainEqual(
          expect.objectContaining({
            eventId: 'event:2',
            memberId: alice.id,
            kind: 'FORUM_POST_MENTION',
            emailStatus: 'SENT',
            retryCount: 0,
          })
        )
        // Post 2 is on a thread followed by Bob
        expect(notifications).toContainEqual(
          expect.objectContaining({
            eventId: 'event:2',
            memberId: bob.id,
            kind: 'FORUM_THREAD_ENTITY_POST',
            emailStatus: 'SENT',
            retryCount: 0,
          })
        )
        // Post 3 is in a category watched by Alice
        expect(notifications).toContainEqual(
          expect.objectContaining({
            eventId: 'event:3',
            memberId: alice.id,
            kind: 'FORUM_CATEGORY_ENTITY_POST',
            emailStatus: 'SENT',
            retryCount: 0,
          })
        )
        // Post 3 is not on a thread or a category muted by Bob (and he subscribed to all posts)
        expect(notifications).toContainEqual(
          expect.objectContaining({
            eventId: 'event:3',
            memberId: bob.id,
            kind: 'FORUM_POST_ALL',
            emailStatus: 'SENT',
            retryCount: 0,
          })
        )
        // Post 5 mentions Dave
        expect(notifications).toContainEqual(
          expect.objectContaining({
            eventId: 'event:5',
            memberId: dave.id,
            kind: 'FORUM_POST_MENTION',
            emailStatus: 'IGNORED',
            retryCount: 0,
          })
        )
        // Post 5 replies to Alice
        expect(notifications).toContainEqual(
          expect.objectContaining({
            eventId: 'event:5',
            memberId: alice.id,
            kind: 'FORUM_POST_REPLY',
            emailStatus: 'SENT',
            retryCount: 0,
          })
        )
        expect(notifications).toHaveLength(7)

        // -------------------
        // Check emails
        // -------------------

        // Post 1 is on Alice's thread
        expect(mockEmailProvider.sentEmails).toContainEqual(
          expect.objectContaining({
            to: alice.email,
            subject: expect.stringContaining('thread:title'),
            html: expect.stringMatching(/\/#\/forum\/thread\/thread:id\?post=post:1/s),
          })
        )
        // Post 2 mentions Alice
        expect(mockEmailProvider.sentEmails).toContainEqual(
          expect.objectContaining({
            to: alice.email,
            subject: expect.stringContaining('thread:title'),
            html: expect.stringMatching(/\/#\/forum\/thread\/thread:id\?post=post:2/s),
          })
        )
        // Post 2 is on a thread followed by Bob
        expect(mockEmailProvider.sentEmails).toContainEqual(
          expect.objectContaining({
            to: bob.email,
            subject: expect.stringContaining('thread:title'),
            html: expect.stringMatching(/\/#\/forum\/thread\/thread:id\?post=post:2/s),
          })
        )
        // Post 3 is in a category watched by Alice
        expect(mockEmailProvider.sentEmails).toContainEqual(
          expect.objectContaining({
            to: alice.email,
            subject: expect.stringContaining('thread:title'),
            html: expect.stringMatching(/\/#\/forum\/thread\/thread:id\?post=post:3/s),
          })
        )
        // Post 3 is not on a thread or a category muted by Bob (and he subscribed to all posts)
        expect(mockEmailProvider.sentEmails).toContainEqual(
          expect.objectContaining({
            to: bob.email,
            subject: expect.stringContaining('thread:title'),
            html: expect.stringMatching(/\/#\/forum\/thread\/thread:id\?post=post:3/s),
          })
        )
        // Post 5 replies to Alice
        expect(mockEmailProvider.sentEmails).toContainEqual(
          expect.objectContaining({
            to: alice.email,
            subject: expect.stringContaining('thread:title'),
            html: expect.stringMatching(/\/#\/forum\/thread\/thread:id\?post=post:5/s),
          })
        )
        expect(mockEmailProvider.sentEmails.length).toBe(6)
      })

      it('Role notifications', async () => {
        // -------------------
        // Initialize database
        // -------------------

        const alice = await createMember(1, 'alice')
        const bob = await createMember(2, 'bob')
        const charlie = await createMember(3, 'charlie')
        await createMember(4, 'dave')

        // -------------------
        // Mock QN responses
        // -------------------

        mockRequest
          .mockReturnValueOnce({
            workers: [
              {
                groupId: 'forumWorkingGroup',
                isLead: true,
                membershipId: alice.id.toString(),
              },
              {
                groupId: 'forumWorkingGroup',
                isLead: false,
                membershipId: bob.id.toString(),
              },
              {
                groupId: 'operationsWorkingGroupGamma',
                isLead: true,
                membershipId: charlie.id.toString(),
              },
            ],
            electedCouncils: [{ councilMembers: [{ memberId: bob.id.toString() }] }],
          })
          .mockReturnValueOnce({
            events: [
              // Alice, Bob, and Charlie
              postAddedEvent(1, { text: 'Hello [@Dao](#mention?role=dao)' }),

              // Alice and Bob
              postAddedEvent(2, { text: 'Hello [@Forum Workers](#mention?role=workers_forumWorkingGroup)' }),

              // Just Alice
              postAddedEvent(3, { text: 'Hello [@Forum Lead](#mention?role=lead_forumWorkingGroup)' }),

              // Alice and Charlie
              postAddedEvent(4, { text: 'Hello [@WG Leads](#mention?role=leads)' }),

              // Just Bob
              postAddedEvent(5, { text: 'Hello [@Council](#mention?role=council)' }),
            ],
          })
          .mockReturnValue({
            events: [],
            forumCategoryByUniqueInput: { parentId: null },
            forumPostByUniqueInput: {
              author: { handle: 'author:handle' },
              thread: { id: 'thread:id', title: 'thread:title' },
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

        // Post 1 notify every Dao members
        expect(notifications).toContainEqual(expect.objectContaining({ entityId: 'post:1', memberId: alice.id }))
        expect(notifications).toContainEqual(expect.objectContaining({ entityId: 'post:1', memberId: bob.id }))
        expect(notifications).toContainEqual(expect.objectContaining({ entityId: 'post:1', memberId: charlie.id }))

        // Post 2 notify forum workers
        expect(notifications).toContainEqual(expect.objectContaining({ entityId: 'post:2', memberId: alice.id }))
        expect(notifications).toContainEqual(expect.objectContaining({ entityId: 'post:2', memberId: bob.id }))

        // Post 3 notify forum lead
        expect(notifications).toContainEqual(expect.objectContaining({ entityId: 'post:3', memberId: alice.id }))

        // Post 4 notify all leads
        expect(notifications).toContainEqual(expect.objectContaining({ entityId: 'post:4', memberId: alice.id }))
        expect(notifications).toContainEqual(expect.objectContaining({ entityId: 'post:4', memberId: charlie.id }))

        // Post 5 notify councilors
        expect(notifications).toContainEqual(expect.objectContaining({ entityId: 'post:5', memberId: bob.id }))

        expect(notifications).toHaveLength(9)
      })
    })

    describe('ThreadCreatedEvent', () => {
      it('Member notifications', async () => {
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
          .mockReturnValueOnce({ workers: [], electedCouncils: [] })
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
                  forumThreadByUniqueInput: { author: { handle: 'author:handle' }, title: `${variables.id}:title` },
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

      it('Role notifications', async () => {
        // -------------------
        // Initialize database
        // -------------------

        const alice = await createMember(1, 'alice')
        const bob = await createMember(2, 'bob')

        // -------------------
        // Mock QN responses
        // -------------------

        mockRequest
          .mockReturnValueOnce({
            workers: [{ groupId: 'forumWorkingGroup', isLead: true, membershipId: alice.id.toString() }],
            electedCouncils: [{ councilMembers: [{ memberId: bob.id.toString() }] }],
          })
          .mockReturnValueOnce({
            events: [
              threadCreatedEvent(1, { text: 'Hi [@Forum Lead](#mention?role=lead_forumWorkingGroup)' }),
              threadCreatedEvent(2, { text: 'Hi [@Council](#mention?role=council)' }),
              threadCreatedEvent(3, { author: alice.id, text: 'Hi [@Dao](#mention?role=dao)' }),
            ],
          })
          .mockReturnValue({
            events: [],
            forumCategoryByUniqueInput: { parentId: null },
            forumThreadByUniqueInput: { author: { handle: 'author:handle' }, title: 'thread:title' },
          })

        // -------------------
        // Run
        // -------------------

        await run()

        // -------------------
        // Check notifications
        // -------------------

        const notifications = await prisma.notification.findMany()

        // Thread 1 notify forum lead
        expect(notifications).toContainEqual(expect.objectContaining({ entityId: 'thread:1', memberId: alice.id }))

        // Thread 2 notify councilors
        expect(notifications).toContainEqual(expect.objectContaining({ entityId: 'thread:2', memberId: bob.id }))

        // Thread 3 notify DAO (except for Alice who posted the thread)
        expect(notifications).toContainEqual(expect.objectContaining({ entityId: 'thread:3', memberId: bob.id }))

        expect(notifications).toHaveLength(3)
      })
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
        .mockReturnValueOnce({ workers: [], electedCouncils: [] })
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
          emailStatus: 'SENT',
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
        .mockReturnValueOnce({ workers: [], electedCouncils: [] })
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
          emailStatus: 'SENT',
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
        .mockReturnValueOnce({ workers: [], electedCouncils: [] })
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
          emailStatus: 'SENT',
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

  describe('proposal', () => {
    describe('ProposalDiscussionPostCreatedEvent', () => {
      it('Member notifications', async () => {
        // -------------------
        // Initialize database
        // -------------------

        // - Alice is using the default behavior for general subscriptions
        // - Alice should be notified of any post from the foo proposal
        const alice = await createMember(1, 'alice', [{ kind: 'PROPOSAL_ENTITY_DISCUSSION', entityId: 'foo' }])

        // - Bob should be notified of all proposal discussion post
        // - Bob should not be notified of discussions on the foo and bar proposals
        const bob = await createMember(2, 'bob', [
          { kind: 'PROPOSAL_DISCUSSION_ALL' },
          { kind: 'PROPOSAL_ENTITY_DISCUSSION', entityId: 'foo', shouldNotify: false },
          { kind: 'PROPOSAL_ENTITY_DISCUSSION', entityId: 'bar', shouldNotify: false },
        ])

        // -------------------
        // Mock QN responses
        // -------------------

        mockRequest
          .mockReturnValueOnce({ workers: [], electedCouncils: [] })
          .mockReturnValueOnce({
            events: [
              // Bob should be notified as he is subscribed to all proposal discussion.
              proposalDiscussionPostCreatedEvent(1),
              // (the rest of the post are on proposals ignored by Bob)
              // Alice should be notified as she is subscribed to the foo proposal.
              proposalDiscussionPostCreatedEvent(2, { proposal: 'foo' }),
              // Alice should be notified as she is mentioned in the post. Bob should be notified too.
              proposalDiscussionPostCreatedEvent(3, {
                text: `Hi [@Alice](#mention?member-id=${alice.id})`,
                proposal: 'bar',
              }),
              // Alice should be notified as she is the proposal creator.
              proposalDiscussionPostCreatedEvent(4, { proposalCreator: alice.id, proposal: 'bar' }),
              // Alice should be notified as she is replied to.
              proposalDiscussionPostCreatedEvent(5, { repliesTo: alice.id, proposal: 'bar' }),
              // Alice should be notified as she wrote a post in the discussion.
              proposalDiscussionPostCreatedEvent(6, { posts: [{ author: alice.id }], proposal: 'bar' }),
            ],
          })
          .mockReturnValue({
            events: [],
            proposalDiscussionPostByUniqueInput: {
              author: { handle: 'proposal:title' },
              discussionThread: {
                proposal: { id: 'proposal:id', title: 'proposal:title' },
              },
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

        // Post 1 is not in the proposal foo or bar
        expect(notifications).toContainEqual(
          expect.objectContaining({
            eventId: 'event:1',
            memberId: bob.id,
            kind: 'PROPOSAL_DISCUSSION_ALL',
            entityId: 'post:1',
          })
        )

        // Post 2 is the proposal watched by Alice
        expect(notifications).toContainEqual(
          expect.objectContaining({
            eventId: 'event:2',
            memberId: alice.id,
            kind: 'PROPOSAL_ENTITY_DISCUSSION',
            entityId: 'post:2',
          })
        )

        // Post 3 mentions Alice
        expect(notifications).toContainEqual(
          expect.objectContaining({
            eventId: 'event:3',
            memberId: alice.id,
            kind: 'PROPOSAL_DISCUSSION_MENTION',
            entityId: 'post:3',
          })
        )

        // Post 4 is on a proposal created by Alice
        expect(notifications).toContainEqual(
          expect.objectContaining({
            eventId: 'event:4',
            memberId: alice.id,
            kind: 'PROPOSAL_DISCUSSION_CREATOR',
            entityId: 'post:4',
          })
        )

        // Post 5 replies to Alice
        expect(notifications).toContainEqual(
          expect.objectContaining({
            eventId: 'event:5',
            memberId: alice.id,
            kind: 'PROPOSAL_DISCUSSION_REPLY',
            entityId: 'post:5',
          })
        )

        // Post 6 is on a discussion where Alice wrote a post
        expect(notifications).toContainEqual(
          expect.objectContaining({
            eventId: 'event:6',
            memberId: alice.id,
            kind: 'PROPOSAL_DISCUSSION_CONTRIBUTOR',
            entityId: 'post:6',
          })
        )

        expect(notifications).toHaveLength(6)

        // -------------------
        // Check emails
        // -------------------

        expect(mockEmailProvider.sentEmails).toContainEqual(
          expect.objectContaining({
            to: bob.email,
            subject: expect.stringContaining('proposal:title'),
            html: expect.stringMatching(/\/#\/proposals\/preview\/proposal:id\?post=post:1/s),
          })
        )

        expect(mockEmailProvider.sentEmails).toContainEqual(
          expect.objectContaining({
            to: alice.email,
            subject: expect.stringContaining('proposal:title'),
            html: expect.stringMatching(/\/#\/proposals\/preview\/proposal:id\?post=post:2/s),
          })
        )

        expect(mockEmailProvider.sentEmails).toContainEqual(
          expect.objectContaining({
            to: alice.email,
            subject: expect.stringContaining('proposal:title'),
            html: expect.stringMatching(/\/#\/proposals\/preview\/proposal:id\?post=post:3/s),
          })
        )

        expect(mockEmailProvider.sentEmails).toContainEqual(
          expect.objectContaining({
            to: alice.email,
            subject: expect.stringContaining('proposal:title'),
            html: expect.stringMatching(/\/#\/proposals\/preview\/proposal:id\?post=post:4/s),
          })
        )

        expect(mockEmailProvider.sentEmails).toContainEqual(
          expect.objectContaining({
            to: alice.email,
            subject: expect.stringContaining('proposal:title'),
            html: expect.stringMatching(/\/#\/proposals\/preview\/proposal:id\?post=post:5/s),
          })
        )

        expect(mockEmailProvider.sentEmails).toContainEqual(
          expect.objectContaining({
            to: alice.email,
            subject: expect.stringContaining('proposal:title'),
            html: expect.stringMatching(/\/#\/proposals\/preview\/proposal:id\?post=post:6/s),
          })
        )
      })

      it('Role notifications', async () => {
        // -------------------
        // Initialize database
        // -------------------

        const alice = await createMember(1, 'alice')
        const bob = await createMember(2, 'bob')

        // -------------------
        // Mock QN responses
        // -------------------

        mockRequest
          .mockReturnValueOnce({
            workers: [{ groupId: 'forumWorkingGroup', isLead: true, membershipId: alice.id.toString() }],
            electedCouncils: [{ councilMembers: [{ memberId: bob.id.toString() }] }],
          })
          .mockReturnValueOnce({
            events: [
              proposalDiscussionPostCreatedEvent(1, {
                text: 'Hello [@Forum Lead](#mention?role=lead_forumWorkingGroup)',
              }),
              proposalDiscussionPostCreatedEvent(2, { text: 'Hello [@Council](#mention?role=council)' }),
              proposalDiscussionPostCreatedEvent(3, { author: alice.id, text: 'Hello [@Dao](#mention?role=dao)' }),
            ],
          })
          .mockReturnValue({
            events: [],
            proposalDiscussionPostByUniqueInput: {
              author: { handle: 'proposal:title' },
              discussionThread: {
                proposal: { id: 'proposal:id', title: 'proposal:title' },
              },
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

        // Post 1 notify forum lead
        expect(notifications).toContainEqual(expect.objectContaining({ entityId: 'post:1', memberId: alice.id }))

        // Post 2 notify councilors
        expect(notifications).toContainEqual(expect.objectContaining({ entityId: 'post:2', memberId: bob.id }))

        // Post 3 notify DAO (except for Alice who posted the thread)
        expect(notifications).toContainEqual(expect.objectContaining({ entityId: 'post:3', memberId: bob.id }))

        expect(notifications).toHaveLength(3)
      })
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
        .mockReturnValueOnce({ workers: [], electedCouncils: [] })
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
            emailStatus: 'PENDING',
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
          emailStatus: 'FAILED',
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
        .mockReturnValueOnce({ workers: [], electedCouncils: [] })
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
          emailStatus: 'PENDING',
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
          emailStatus: 'SENT',
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
