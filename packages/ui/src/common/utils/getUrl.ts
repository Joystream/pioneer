import { CouncilRoutes } from '@/council/constants'

const modules = {
  MyProfile: '/profile',
  Members: '/members',
  Election: CouncilRoutes.currentElection,
  PastElections: CouncilRoutes.pastElections,
}

interface GetUrlParams {
  module: keyof typeof modules
  id?: string
  query?: Record<string, string>
}

export function getUrl(params: GetUrlParams | 'CurrentPage'): string {
  if (params === 'CurrentPage') {
    return window.location.href
  }
  return (
    window.location.origin +
    '/#' +
    modules[params.module] +
    (params.id ? `/${params.id}` : '') +
    (params.query ? getQuery(params.query) : '')
  )
}

const getQuery = (query: Record<string, string>) =>
  Object.entries(query)
    .map((entry) => `${entry[0]}=${entry[1]}`)
    .reduce((queries, query, index, array) => queries + query + (index !== array.length - 1 ? '&' : ''), '?')
