import { useLocation } from 'react-router'

export const useRouteQuery = () => {
  return new URLSearchParams(useLocation().search)
}
