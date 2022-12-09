export const ForumRoutes = {
  forum: '/forum',
  category: '/forum/category/:id/:type?',
  archived: '/forum/archived',
  watchlist: '/forum/watchlist',
  thread: '/forum/thread/:id',
  myThreads: '/forum/my-threads',
} as const

type ForumRoutesType = typeof ForumRoutes

declare module '@/app/constants/routes' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Routes extends ForumRoutesType {}
}
