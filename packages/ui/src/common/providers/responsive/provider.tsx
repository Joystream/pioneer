import React, { useEffect, useMemo, useState } from 'react'

import { BreakPoints } from '@/common/constants'
import { ResponsiveContext, UseResponsive } from '@/common/providers/responsive/context'

interface Props {
  children: React.ReactNode
}

export const ResponsiveProvider = (props: Props) => {
  const [openNavSidebar, setOpenNavSidebar] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (windowWidth >= 1024) setOpenNavSidebar(false)
  }, [windowWidth])

  const value: UseResponsive = useMemo(
    () => ({
      size:
        windowWidth >= BreakPoints.lg
          ? 'lg'
          : windowWidth >= BreakPoints.md
          ? 'md'
          : windowWidth >= BreakPoints.sm
          ? 'sm'
          : windowWidth >= BreakPoints.xs
          ? 'xs'
          : 'xxs',
      isMobile: windowWidth < 1024,
      isMobileWallet: screen.width < 768,
      openNavSidebar,
      setOpenNavSidebar,
    }),
    [windowWidth, openNavSidebar]
  )

  return <ResponsiveContext.Provider value={value}>{props.children}</ResponsiveContext.Provider>
}
