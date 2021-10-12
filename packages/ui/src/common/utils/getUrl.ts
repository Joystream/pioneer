import { ExtractRouteParams, generatePath } from 'react-router'

import { RouteName } from '@/app/constants/routes'

interface GetUrlParams<R extends RouteName> {
  route: R
  params?: ExtractRouteParams<R>
  query?: Record<string, string>
}

export function getUrl<R extends RouteName>(params: GetUrlParams<R>): string {
  return (
    window.location.origin +
    window.location.pathname +
    window.location.search +
    '#' +
    generatePath(params.route, params.params) +
    (params.query && Object.keys(params.query).length ? getQuery(params.query) : '')
  )
}

const getQuery = (query: Record<string, string>) =>
  '?' +
  Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
