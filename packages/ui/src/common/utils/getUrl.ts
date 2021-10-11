import { CouncilRoutes } from '@/council/constants'
import { ProposalsRoutes } from '@/proposals/constants/routes'

const pages = {
  MyProfile: '/profile',
  Members: '/members',
  Election: CouncilRoutes.currentElection,
  PastElections: CouncilRoutes.pastElections,
  ProposalPreview: ProposalsRoutes.preview,
}

interface GetUrlParams {
  page: keyof typeof pages
  id?: string
  query?: Record<string, string>
}

export function getUrl(params: GetUrlParams | 'CurrentPage'): string {
  if (params === 'CurrentPage') {
    return window.location.href
  }
  return (
    window.location.origin +
    window.location.pathname +
    window.location.search +
    '#' +
    pages[params.page] +
    (params.id ? `/${params.id}` : '') +
    (params.query && Object.keys(params.query).length ? getQuery(params.query) : '')
  )
}

const getQuery = (query: Record<string, string>) =>
  '?' +
  Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
