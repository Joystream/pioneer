import { createContext } from 'react'

export interface UseResponsive {
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg'
  isMobile: boolean
  isMobileWallet: boolean
  openNavSidebar: boolean
  setOpenNavSidebar: (openNavSidebar: boolean) => void
}

export const ResponsiveContext = createContext<UseResponsive>({
  size: 'lg',
  isMobile: false,
  isMobileWallet: false,
  openNavSidebar: false,
  setOpenNavSidebar: () => undefined,
})
