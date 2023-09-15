import { createContext } from 'react'

export interface UseResponsive {
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg'
  isMobile: boolean
}

export const ResponsiveContext = createContext<UseResponsive>({
  size: 'lg',
  isMobile: false,
})
