export const ForumRoutes = {
  forum: '/forum',
  category: '/forum/category/:id/:type?',
  archived: '/forum/archived',
  thread: '/forum/thread/:id',
  popularThread: '/forum/thread',
  forumOverview: '/forum/overview',
  latestThreads: '/forum/latest-threads',
  topThreads: '/forum/top-threads',
  myThreads: '/forum/my-threads',
} as const

type ForumRoutesType = typeof ForumRoutes

declare module '@/app/constants/routes' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Routes extends ForumRoutesType {}
}
