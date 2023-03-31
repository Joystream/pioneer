import { createMember } from '@test/_mocks/notifier/createMember'
import { postAddedEvent, threadCreatedEvent } from '@test/_mocks/notifier/events'
import { mockRequest } from '@test/setup'

import { prisma } from '@/common/prisma'
import { GetForumCategoryDocument, GetNotificationEventsDocument } from '@/common/queries'
import { createNotifications } from '@/notifier/createNotifications'

describe('createNotifications', () => {
  beforeEach(async () => {
    await prisma.store.deleteMany()
    await prisma.subscription.deleteMany()
    await prisma.notification.deleteMany()
    await prisma.member.deleteMany()
    mockRequest.mockReset()
  })

  describe('forum', () => {
    it('PostAddedEvent', async () => {
      // - Alice is using the default behavior for general subscriptions
      // - Alice should be notified of any new post in the category "baz" or it's sub categories
      const alice = await createMember(1, 'alice', [{ kind: 'FORUM_WATCHED_CATEGORY_POST', entityId: 'baz' }])

      // - By default Bob should be notified of any new post
      // - Bob should not be notified of new post on the thread "foo" or the category "qux"
      // - Bob should be notified of new post on the thread "bar" as FORUM_WATCHED_THREAD rather than FORUM_POST_ALL
      const bob = await createMember(2, 'bob', [
        { kind: 'FORUM_POST_ALL' },
        { kind: 'FORUM_WATCHED_THREAD', entityId: 'foo', shouldNotify: false },
        { kind: 'FORUM_WATCHED_THREAD', entityId: 'bar' },
        { kind: 'FORUM_WATCHED_CATEGORY_POST', entityId: 'qux', shouldNotify: false },
      ])

      // Charlie had not registered in the back-end he should not get any notification
      const charlie = { id: 3 }

      mockRequest.mockReturnValue({ events: [] }).mockReturnValueOnce({
        events: [
          postAddedEvent(1, { thread: 'foo', threadAuthor: alice.id, text: `Hi [@Bob](#mention?member-id=${bob.id})` }),
          postAddedEvent(2, { thread: 'bar', text: `Hi [@Alice](#mention?member-id=${alice.id})` }),
          postAddedEvent(3, { category: 'baz', threadAuthor: charlie.id }),
          postAddedEvent(4, { category: 'qux', author: alice.id, text: `I [@Alice](#mention?member-id=${alice.id})` }),
        ],
      })

      await createNotifications()

      const notifications = await prisma.notification.findMany()

      expect(notifications).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            eventId: 'event:1',
            memberId: alice.id,
            kind: 'FORUM_THREAD_CREATOR',
            entityId: 'post:1',
            isRead: false,
            isSent: false,
          }),
          expect.objectContaining({
            eventId: 'event:2',
            memberId: alice.id,
            kind: 'FORUM_POST_MENTION',
          }),
          expect.objectContaining({
            eventId: 'event:2',
            memberId: bob.id,
            kind: 'FORUM_WATCHED_THREAD',
          }),
          expect.objectContaining({
            eventId: 'event:3',
            memberId: alice.id,
            kind: 'FORUM_WATCHED_CATEGORY_POST',
          }),
          expect.objectContaining({
            eventId: 'event:3',
            memberId: bob.id,
            kind: 'FORUM_POST_ALL',
          }),
        ])
      )
      expect(notifications).toHaveLength(5)
    })

    it('ThreadCreatedEvent', async () => {
      // - Alice is using the default behavior for general subscriptions
      // - Alice should get notified of any new thread in bar or it's sub categories
      const alice = await createMember(1, 'alice', [{ kind: 'FORUM_WATCHED_CATEGORY_THREAD', entityId: 'bar' }])

      // - By default Bob should be notified of any new thread
      // - Bob should not be notified of threads created in category foo or it's sub categories (bar)
      const bob = await createMember(2, 'bob', [
        { kind: 'FORUM_THREAD_ALL' },
        { kind: 'FORUM_WATCHED_CATEGORY_THREAD', entityId: 'foo', shouldNotify: false },
      ])

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
          if (doc === GetNotificationEventsDocument) {
            return { events: [] }
          } else if (doc === GetForumCategoryDocument) {
            return { forumCategoryByUniqueInput: { parentId: variables.id === 'bar' ? 'foo' : null } }
          }
        })

      await createNotifications()

      const notifications = await prisma.notification.findMany()

      expect(notifications).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            eventId: 'event:1',
            memberId: alice.id,
            kind: 'FORUM_THREAD_MENTION',
            entityId: 'thread:1',
          }),
          expect.objectContaining({
            eventId: 'event:2',
            memberId: alice.id,
            kind: 'FORUM_WATCHED_CATEGORY_THREAD',
            entityId: 'thread:2',
          }),
          expect.objectContaining({
            eventId: 'event:3',
            memberId: bob.id,
            kind: 'FORUM_THREAD_ALL',
            entityId: 'thread:3',
          }),
        ])
      )
      expect(notifications).toHaveLength(3)
    })
  })
})
