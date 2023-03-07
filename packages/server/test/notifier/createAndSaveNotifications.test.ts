import { createMember } from '@test/_mocks/notifier/createMember'
import { postAddedEvent } from '@test/_mocks/notifier/events'
import { mockRequest } from '@test/setup'

import { prisma } from '@/common/prisma'
import { createAndSaveNotifications } from '@/notifier/run'

describe('createAndSaveNotifications', () => {
  beforeEach(async () => {
    await prisma.subscription.deleteMany()
    await prisma.notification.deleteMany()
    await prisma.member.deleteMany()
  })

  it('forum', async () => {
    // - Alice is using the default behavior
    const alice = await createMember(1, 'alice')

    // - By default Bob should be notified of any new post
    // - Bob should not be notified of new post on thread:1 and thread:2
    const bob = await createMember(2, 'bob', [
      { notificationType: 'FORUM_POST_ALL' },
      { notificationType: 'FORUM_WATCHED_THREAD', entityIds: ['thread:1', 'thread:2'], shouldNotify: false },
    ])

    mockRequest.mockReturnValue({
      events: [
        postAddedEvent(1, 1, { threadAuthor: alice.id, text: `Hi [@Bob](#mention?member-id=${bob.id})` }),
        postAddedEvent(2, 2, { threadAuthor: bob.id, text: `Hi [@Alice](#mention?member-id=${alice.id})` }),
        postAddedEvent(3, 3),
      ],
    })

    await createAndSaveNotifications()

    const notifications = await prisma.notification.findMany()

    expect(notifications.find(({ eventId }) => eventId === 'event:1')).toMatchObject({
      memberId: alice.id,
      notificationType: 'FORUM_THREAD_CREATOR',
      entityId: 'post:1',
      isRead: false,
      isSent: false,
    })
    expect(notifications.find(({ eventId }) => eventId === 'event:2')).toMatchObject({
      memberId: alice.id,
      notificationType: 'FORUM_POST_MENTION',
    })
    expect(notifications.find(({ eventId }) => eventId === 'event:3')).toMatchObject({
      memberId: bob.id,
      notificationType: 'FORUM_POST_ALL',
    })
    expect(notifications).toHaveLength(3)
  })
})
