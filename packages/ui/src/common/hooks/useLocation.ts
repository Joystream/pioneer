import escapeStringRegexp from 'escape-string-regexp'
import { useMemo } from 'react'
import { useLocation as useReactRouterLocation } from 'react-router-dom'

export const useLocation = () => {
  const { pathname, search, hash } = useReactRouterLocation()

  const origin = useMemo(
    () => global.location.href.replace(RegExp(`${escapeStringRegexp(pathname + search + hash)}$`), ''),
    []
  )
  return useMemo(() => ({ pathname, search, hash, origin }), [pathname, search, hash])
}
