export const ForumRoutes = {
  forum: '/forum',
  category: '/forum/category/:id/:type?',
  archived: '/forum/archived',
  thread: '/forum/thread',
  overview: '/forum/overview',
  latestThreads: '/forum/latest-threads',
  topThreads: '/forum/top-threads',
  myThreads: '/forum/my-threads',
} as const

type ForumRoutesType = typeof ForumRoutes

declare module '@/app/constants/routes' {
  // eslint-disable-next-line
  interface Routes extends ForumRoutesType {}
}
