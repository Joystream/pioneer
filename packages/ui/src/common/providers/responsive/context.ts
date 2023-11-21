import { createContext } from 'react'

export interface UseResponsive {
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg'
  isMobile: boolean
  supportTransactions: boolean
  openNavSidebar: boolean
  setOpenNavSidebar: (openNavSidebar: boolean) => void
}

export const ResponsiveContext = createContext<UseResponsive>({
  size: 'lg',
  isMobile: false,
  supportTransactions: true,
  openNavSidebar: false,
  setOpenNavSidebar: () => undefined,
})
