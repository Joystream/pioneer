import { match } from 'ts-pattern'

import { PIONEER_URL } from '@/common/config'
import { renderPioneerEmail } from '@/common/email-templates/pioneer-email'

import { EmailFromNotificationFn } from './utils'
import { getForumPost, getForumThread } from './utils/forum'

export const fromPostAddedNotification: EmailFromNotificationFn = async ({ id, kind, entityId, member }) => {
  if (
    kind !== 'FORUM_THREAD_CONTRIBUTOR' &&
    kind !== 'FORUM_THREAD_CREATOR' &&
    kind !== 'FORUM_POST_MENTION' &&
    kind !== 'FORUM_POST_REPLY' &&
    kind !== 'FORUM_THREAD_ENTITY_POST' &&
    kind !== 'FORUM_CATEGORY_ENTITY_POST' &&
    kind !== 'FORUM_POST_ALL'
  ) {
    // do an early return if the kind is not supported
    // this way we can fetch the data outside of the switch
    // we also get `kind` to be narrowed down to the supported types
    return
  }

  if (!entityId) {
    throw Error(`Missing post id in notification ${kind}, with id: ${id}`)
  }

  const { author, thread, threadId } = await getForumPost(entityId)

  const emailSubject = `[Pioneer forum] ${thread}`

  const emailSummary: string = match(kind)
    .with('FORUM_THREAD_CONTRIBUTOR', 'FORUM_THREAD_CREATOR', () => `${author} replied in the thread ${thread}.`)
    .with('FORUM_POST_MENTION', () => `${author} mentioned you in the thread ${thread}.`)
    .with('FORUM_POST_REPLY', () => `${author} replied to your post in the thread ${thread}.`)
    .with(
      'FORUM_THREAD_ENTITY_POST',
      'FORUM_CATEGORY_ENTITY_POST',
      'FORUM_POST_ALL',
      () => `${author} posted in the thread ${thread}.`
    )
    .exhaustive()

  const emailText: string = match(kind)
    .with('FORUM_THREAD_CONTRIBUTOR', 'FORUM_THREAD_CREATOR', () => `${author} replied in the thread ${thread}.`)
    .with('FORUM_POST_MENTION', () => `${author} mentioned you in the thread ${thread}.`)
    .with('FORUM_POST_REPLY', () => `${author} replied to your post in the thread ${thread}.`)
    .with(
      'FORUM_THREAD_ENTITY_POST',
      'FORUM_CATEGORY_ENTITY_POST',
      'FORUM_POST_ALL',
      () => `${author} posted in the thread ${thread}.`
    )
    .exhaustive()

  const emailHtml = renderPioneerEmail({
    memberHandle: member.name,
    summary: emailSummary,
    text: emailText,
    button: {
      label: 'See on Pioneer',
      href: `${PIONEER_URL}/#/forum/thread/${threadId}?post=${entityId}`,
    },
  })

  return {
    subject: emailSubject,
    html: emailHtml,
    to: member.email,
  }
}

export const fromThreadCreatedNotification: EmailFromNotificationFn = async ({ id, kind, entityId, member }) => {
  if (kind !== 'FORUM_THREAD_MENTION' && kind !== 'FORUM_CATEGORY_ENTITY_THREAD' && kind !== 'FORUM_THREAD_ALL') {
    return
  }

  if (!entityId) {
    throw Error(`Missing thread id in notification ${kind}, with id: ${id}`)
  }

  const { author, title } = await getForumThread(entityId)

  const emailSubject = `[Pioneer forum] ${title}`

  const emailSummary: string = match(kind)
    .with('FORUM_THREAD_MENTION', () => `${author} mentioned you in a new thread ${title}.`)
    .with('FORUM_CATEGORY_ENTITY_THREAD', 'FORUM_THREAD_ALL', () => `${author} posted a new thread ${title}.`)
    .exhaustive()

  const emailText: string = match(kind)
    .with('FORUM_THREAD_MENTION', () => `${author} mentioned you in a new thread ${title}.`)
    .with('FORUM_CATEGORY_ENTITY_THREAD', 'FORUM_THREAD_ALL', () => `${author} posted a new thread ${title}.`)
    .exhaustive()

  const emailHtml = renderPioneerEmail({
    memberHandle: member.name,
    summary: emailSummary,
    text: emailText,
    button: {
      label: 'See on Pioneer',
      href: `${PIONEER_URL}/#/forum/thread/${entityId}`,
    },
  })

  return {
    subject: emailSubject,
    html: emailHtml,
    to: member.email,
  }
}
